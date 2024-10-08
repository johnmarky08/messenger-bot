module.exports.config = {
  name: "lyrics",
  des: "Lyrics Of A Music",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const msg = global.msg.split(" | ");
  if (!msg) return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID);
  if (!msg[1]) return api.sendMessage(`Wrong Format!\n\nExample: ${global.config.PREFIX}lyrics Love Story | Taylor Swift`, event.threadID);
  const lyricsf = require("lyrics-finder");
  (async function(artist, title) {
    let lyrics = await lyricsf(artist, title) || "Not Found!";
    api.sendMessage(`LYRICS OF ${msg[0].toUpperCase()}\n\n` + lyrics, event.threadID, event.mesaageID);
  })(msg[1], msg[0]);
}