module.exports.config = {
  name: "ttdl",
  des: "Tiktok To Mp4",
  nodeDepends:{},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function ({ event, api }){
  const isUrlValid = global.events.isUrlValid;
  const fs = require("fs-extra"),
    msg = global.msg;
  if (!msg) return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID);
  else if (!isUrlValid(msg)) {
    return api.sendMessage("Not A Valid Link!", event.threadID, event.messageID)
  }
  const axios = require("axios");
  const request = require("request");
  const options = {
    method: 'GET',
    url: 'https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index',
    params: {url: msg.split("?")[0]},
    headers: {
      'X-RapidAPI-Key': 'e712ba46admsh2861ddc6dbd65b2p18b26ajsn09208fae3a3c',
      'X-RapidAPI-Host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'
    }
  };
  var ttdl = await axios.request(options);
  const callback = function () {
    api.sendMessage({body:`Caption:\n\n${ttdl.data.description[0]}\n\nAuthor: ${ttdl.data.author[0]}`,attachment: fs.createReadStream(__dirname + `/cache/ttdl.mp4`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/ttdl.mp4`), event.messageID);
  }
  request(ttdl.data.video[0]).pipe(fs.createWriteStream(__dirname + `/cache/ttdl.mp4`)).on("close", callback);
}