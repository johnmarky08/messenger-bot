module.exports.config = {
  name: "img2text",
  des: "Image To Text",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  try {
    const FormData = require("form-data");
    const axios = require("axios");
    const fs = require("fs-extra");
    const response = await axios.get(event.messageReply.attachments[0].url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, "utf-8");
    fs.writeFileSync(__dirname + '/cache/1.png', buffer);
    var formData = new FormData();
    formData.append('image', fs.createReadStream(__dirname + '/cache/1.png'));
    const options = {
      method: 'POST',
      url: 'https://api.api-ninjas.com/v1/imagetotext',
      data: formData,
      headers: {
        'X-Api-Key': '47GNm3hTZi7qJYbtoWy7sg==bKRexxYIMCn3qAPs'
      }
    };
    async function o() {
      var txt = "";
      var res = await axios.request(options);
      for (var i = 0; i < res.data.length; i++) {
        txt += `${res.data[i].text} `
      }
      api.sendMessage(txt, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
    }
    return o()
  } catch {
    return api.sendMessage(global.langText("commands", "noReply"), event.threadID, event.messageID);
  }
}