module.exports.config = {
  name: "trigger",
  des: "Trigger GIF",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const request = require("request");
  const fs = require("fs-extra");
  var john = global.msg;
  if (!john[0]) { var uid = event.senderID }
  if (event.type == "message_reply") { uid = event.messageReply.senderID }
  if (john.indexOf('@') !== -1) { uid = Object.keys(event.mentions)[0] }
  let callback = function() {
    api.sendMessage({
      body: ``,
      attachment: fs.createReadStream(__dirname + `/cache/trigger.gif`)
    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/trigger.gif`), event.messageID);
  };
  request(encodeURI(`https://muichiro-api.onrender.com/trigger?uid=${uid}&api_key=muichiro`)).pipe(fs.createWriteStream(__dirname + `/cache/trigger.gif`)).on("close", callback);
}