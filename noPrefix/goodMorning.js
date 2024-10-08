module.exports.config = {
  name: "goodMorning",
  nodeDepends: {},
  keys: [
    "maaga", "good morning", "morning", "umaga", "magandang umaga", "sunrise", "gising na", "bungad"
  ],
  des: "No Prefix Good Morning",
  author: "John Arida",
  version: "1.0.0"
};

module.exports.start = async function({ event, api }) {
  const fs = require("fs-extra");
  api.setMessageReaction("🌇", event.messageID, (err) => { }, true);
  var name = await global.Users.get(event.senderID);
  return api.sendMessage({
    body: "Good Morning " + name + "! Tara Kape ☕",
    attachment: fs.createReadStream(__dirname + "/assets/morning.gif")
  }, event.threadID, event.messageID)
}