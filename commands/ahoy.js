module.exports.config = {
  name: "ahoy",
  des: "Ahoy Canvas",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.wrap = (ctx, text, maxWidth) => {
  return new Promise(resolve => {
    if (ctx.measureText(text).width < maxWidth) return resolve([text]);
    if (ctx.measureText('W').width > maxWidth) return resolve(null);
    const words = text.split(' ');
    const lines = [];
    let line = '';
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= maxWidth) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
        else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
      else {
        lines.push(line.trim());
        line = '';
      }
      if (words.length === 0) lines.push(line.trim());
    }
    return resolve(lines);
  });
}

module.exports.start = async function({ event, api }) {
  try {
    let { senderID, threadID, messageID } = event;
    const { loadImage, createCanvas } = require("canvas");
    const fs = require("fs-extra");
    const axios = require("axios");
    let pathImg = __dirname + '/cache/ahoy.png';
    var text = global.msg;
    if (event.type == "message_reply") {
      text = event.messageReply.body
    }
    if (!text) return api.sendMessage(global.langText("commands", "noText"), threadID, messageID);
    let _getImg = (await axios.get(`https://i.imgur.com/FofqkNz.jpg`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(pathImg, Buffer.from(_getImg, 'utf-8'));
    let baseImage = await loadImage(pathImg);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.font = "400 18px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "start";
    let fontSize = 20;
    while (ctx.measureText(text).width > 2000) {
      fontSize--;
      ctx.font = `400 ${fontSize}px Arial, Regular`;
    }
    const lines = await this.wrap(ctx, text, 450);
    ctx.fillText(lines.join('\n'), 45, 135);//comment
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    return api.sendMessage({ attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);
  } catch (e) {
    return api.sendMessage("Error: " + e, event.threadID)
  }
}