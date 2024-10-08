module.exports.config = {
  name: "goodAfternoon",
  nodeDepends: {},
  keys: [
    "good afternoon", "aftie", "afternoon", "magandang tanghali", "tanghali", "magandang hapon", "hapon", "noon", "12:00", "12pm"
  ],
  des: "No Prefix Good Afternoon",
  author: "John Arida",
  version: "1.0.0"
};

module.exports.start = async function({ event, api }) {
  const fs = require("fs-extra");
  api.setMessageReaction("🌆", event.messageID, (err) => { }, true);
  var name = await global.Users.get(event.senderID);
  return api.sendMessage({
    body: "Good Afternoon Po, " + name + "!",
    attachment: fs.createReadStream(__dirname + "/assets/afternoon.gif")
  }, event.threadID, event.messageID)
}