module.exports.config = {
  name: "spotifydl",
  des: "Spotify To Mp3",
  nodeDepends: {},
  author: "Unknown",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const isUrlValid = global.events.isUrlValid;
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
  const ffmpeg = require('fluent-ffmpeg');
  ffmpeg.setFfmpegPath(ffmpegPath);
  const spotifydl = require("spotifydl-core").default,
    msg = global.msg;
  if (!msg) return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID);
  else if (!isUrlValid(msg)) {
    return api.sendMessage("Not A Valid Link!", event.threadID, event.messageID)
  }
  const fs = require("fs-extra"),
    spotify = new spotifydl({
      clientId: global.config.spotify.id,
      clientSecret: global.config.spotify.sec
    }),
    song = await spotify.downloadTrack(msg);
  fs.writeFileSync(__dirname + `/cache/song.mp3`, song);
  return api.sendMessage({ attachment: fs.createReadStream(__dirname + `/cache/song.mp3`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/song.mp3`), event.messageID);
}