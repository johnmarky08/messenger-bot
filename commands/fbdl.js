module.exports.config = {
  name: "fbdl",
  des: "FB To Mp4",
  nodeDepends:{},
  author: "D-Jukie",
  version: "1.0.0",
  perm: 2
};

module.exports.start = async function ({ event, api }){
  const isUrlValid = global.events.isUrlValid;
  const request = require("request");
  const fs = require("fs-extra");
  const axios = require("axios");
  var msg = global.msg;
  if (event.type == "message_reply") {
		msg = event.messageReply.body
  }
  if (!msg && event.type !== "message_reply") {
    return api.sendMessage(global.langText("commands", "noLink"), event.threadID, event.messageID)
  } else if (!isUrlValid(msg)) {
    return api.sendMessage("Not A Valid Link!", event.threadID, event.messageID)
  }
  var callback = () => api.sendMessage({attachment: fs.createReadStream(__dirname + "/cache/1.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp4"));
  axios.post('https://www.thetechlearn.com/video-downloader/wp-json/aio-dl/video-data/', {url: msg}).then(ress => {
    //const data = ress.data.medias[1].url;
    return console.log(ress.data.medias)//request(data).pipe(fs.createWriteStream(__dirname+'/cache/1.mp4')).on('close',() => callback());
        })
}