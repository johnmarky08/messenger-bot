module.exports.config = {
  name: "tiktok",
  des: "Tiktok Canvas",
  nodeDepends: {},
  author: "John Arida",
  version: "2.0.0",
  perm: 0
};

module.exports.circle = async (image) => {
  const jimp = require("jimp");
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}

module.exports.wrapText = (ctx, text, maxWidth) => {
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
  const tiktok = ["https://i.postimg.cc/Rht36L82/20230322-161132.png"];
  let { threadID, senderID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const fs = require("fs-extra");
  const axios = require("axios");
  let avatar = __dirname + '/cache/avt.png';
  let pathImg = __dirname + '/cache/img.png';
  let text = global.msg;
  if (!text) return api.sendMessage(`Wrong format\nUse: ${global.config.PREFIX}${this.config.name} [text]`, threadID, messageID);
  let uid = event.senderID;
  if (event.type !== "message_reply") return global.chat(global.langText("commands", "noReply"));
  let name = await global.Users.get(uid);
  if (text.indexOf('@') !== -1) {
    uid = Object.keys(event.mentions)[0];
    name = await global.Users.get(uid);
    if (name !== "Facebook User") text = text.split(" ").slice(name.split(" ").length).join(" ");
    else text = text.split(" ").slice(2).join(" ");
  }
  let getAvatar = (await axios.get(`https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  let getBack = (await axios.get(event.messageReply.attachments[0].url, { responseType: 'arraybuffer' })).data;
  let getImg = (await axios.get(tiktok[Math.floor(Math.random() * tiktok.length)], { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatar, Buffer.from(getAvatar, 'utf-8'));
  fs.writeFileSync(__dirname + "/cache/back.png", Buffer.from(getBack, 'utf-8'));
  var cir = await this.circle(avatar);
  fs.writeFileSync(pathImg, Buffer.from(getImg, 'utf-8'));
  let baseImage = await loadImage(pathImg);
  let back = await loadImage(__dirname + "/cache/back.png");
  if (back.width >= back.height) return global.chat("Only Portrait Photos Alowed!")
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  let image = await loadImage(cir);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(back, 0, 0, canvas.width, canvas.height - 95)
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 320, 305, 50, 50);
  ctx.font = "700 17px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "start";
  ctx.fillText(name, 20, 630);
  ctx.font = "400 17px Arial";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "start";
  let fontSize = 250;
  while (ctx.measureText(text).width > 2600) {
    fontSize--;
    ctx.font = `500 ${fontSize}px Arial`;
  }
  const lines = await this.wrapText(ctx, text, 300);
  ctx.fillText(lines.join('\n'), 20, 660);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(avatar);
  fs.removeSync(__dirname + "/cache/back.png")
  return api.sendMessage({ attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);
}