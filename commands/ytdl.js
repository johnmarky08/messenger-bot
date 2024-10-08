module.exports.config = {
  name: "ytdl",
  des: "YouTube To Mp4",
  nodeDepends: {},
  author: "Unknown",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const isUrlValid = global.events.isUrlValid;
  const axios = require("axios"),
    fs = require("fs-extra"),
    request = require("request"),
    msg = global.msg;
  if (!msg) return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID);
  else if (!isUrlValid(msg)) {
    return api.sendMessage("Not A Valid Link!", event.threadID, event.messageID)
  }
  const id = msg.startsWith("https://youtu.be/") ? msg.split("be/")[1].split("?si=")[0] : msg.split("&v=")[1].split("&feature")[0],
    options = {
      method: 'GET',
      url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
      params: { id },
      headers: {
        'X-RapidAPI-Key': 'e712ba46admsh2861ddc6dbd65b2p18b26ajsn09208fae3a3c',
        'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
      }
    },
    callback = function() {
      api.sendMessage({ attachment: fs.createReadStream(__dirname + `/cache/yt.mp4`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/yt.mp4`), event.messageID);
    }
  const res = await axios.request(options);
  return request(res.data.formats[1].url).pipe(fs.createWriteStream(__dirname + `/cache/yt.mp4`)).on("close", callback);
}