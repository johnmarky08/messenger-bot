module.exports.config = {
  name: "goodEvening",
  nodeDepends: {},
  keys: [
    "good evening", "evening", "gabi", "magandang gabi", "good night", "night", "tulog", "sleep"
  ],
  des: "No Prefix Good Evening",
  author: "John Arida",
  version: "1.0.0"
};

module.exports.start = async function({ event, api }) {
  const fs = require("fs-extra");
  api.setMessageReaction("🌃", event.messageID, (err) => { }, true);
  var name = await global.Users.get(event.senderID);
  return api.sendMessage({
    body: "Good Night " + name + "! Sleep Well 😴💤",
    attachment: fs.createReadStream(__dirname + "/assets/night.gif")
  }, event.threadID, event.messageID)
}