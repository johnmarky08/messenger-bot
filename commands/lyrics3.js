module.exports.config = {
  name: "lyrics3",
  des: "Find Lyrics With Audio",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const msg = global.msg.split(" | ");
  if (!msg) return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID);
  const lyricsf = require("lyrics-finder");
  const axios = require("axios");
  const request = require("request");
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
  const ffmpeg = require('fluent-ffmpeg');
  ffmpeg.setFfmpegPath(ffmpegPath);
  const spotifydl = require("spotifydl-core").default;
  const spotify = new spotifydl({
    clientId: global.config.spotify.id,
    clientSecret: global.config.spotify.sec
  });
  const fs = require("fs-extra");
  const options = {
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/track/search',
    params: { name: msg[0] },
    headers: {
      'X-RapidAPI-Key': global.config.rapidapi,
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    }
  };
  axios.request(options).then(function(res) {
    (async function(artist, title) {
      let lyrics = await lyricsf(artist, title) || "Not Found!";
      let song = await spotify.downloadTrack(res.data.shareUrl);
      fs.writeFileSync(__dirname + `/cache/3.mp3`, song);
      return api.sendMessage({ body: `Title: ${res.data.name}\nDuration: ${res.data.durationText}\nLyrics: \n\n${lyrics}\n\nLink: ${res.data.shareUrl}`, attachment: fs.createReadStream(__dirname + "/cache/3.mp3") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/3.mp3"));
    })(msg[1] || `Unknown`, msg[0]);
  }).catch(function(error) {
    console.error(error);
  });
}