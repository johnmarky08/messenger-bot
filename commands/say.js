module.exports.config = {
  name: "say",
  des: "Bot Speaking",
  nodeDepends:{},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function ({ event, api }){
  const request = require("request");
  const fs = require("fs-extra");
  var john = global.msg.split(" | ");
  var lang = john[1] || "en";
  if (event.type == "message_reply") {
		john = encodeURIComponent(event.messageReply.body).split(" | ")
  }
  if (!john && event.type !== "message_reply") {
    return api.sendMessage(global.langText("commands", "noText"), event.threadID)
  }
  var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/cache/1.mp3")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp3"));
  return request(encodeURI(`https://translate.google.com/translate_tts?ie=UTF-8&q=${john[0]}&tl=${lang}&client=tw-ob`)).pipe(fs.createWriteStream(__dirname+'/cache/1.mp3')).on('close',() => callback());
}