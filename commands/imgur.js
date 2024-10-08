module.exports.config = {
  name: "imgur",
  des: "Upload Images To Imgur",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const request = require("request");
  try {
    var img = event.messageReply.attachments[0].url;
    var post = {
      "method": "POST",
      "url": "https://api.imgur.com/3/image",
      "headers": {
        "Authorization": `Client-ID ${global.config.imgur}`
      },
      "formData": {
        "image": img
      }
    };
    request(post, function(err, res) {
      if (err) return console.log(err)
      var output = JSON.parse(res.body);
      return api.sendMessage("Your Imgur Link:\n\n" + output.data.link, event.threadID)
    })
  } catch (err) {
    return api.sendMessage(global.langText("commands", "noReply"), event.threadID, event.messageID);
  }
}