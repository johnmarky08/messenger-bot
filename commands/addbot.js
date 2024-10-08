module.exports.config = {
  name: "addbot",
  des: "Add An Other Bot To Ban In The System",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  const path = require("path"),
    fs = require("fs-extra"),
    configPath = path.join(__dirname, "..", "config.json"),
    msg = global.msg,
    config = require(configPath);
  if (event.type == "message_reply") { var uid = event.messageReply.senderID }
  if (msg.indexOf('@') !== -1) { uid = Object.keys(event.mentions)[0] }
  if (!msg && (event.type !== "message_reply")) return global.chat(global.langText("commands", "noText"))
  try {
    if (config.otherBot.includes(uid)) return global.chat("This UID Is Already Banned From The System");
    var _ = parseInt(msg);
    if (msg && (msg.indexOf('@') == -1)) {
      if (!global.events.isUid(msg) || !_) return global.chat(global.langText("commands", "notUid"))
      uid = msg
    }
    config.otherBot.push(uid)
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    return api.sendMessage("User ID: " + uid + "\nHas Been Successfully Banned From The System", event.threadID, event.messageID)
  } catch (e) {
    return api.sendMessage("Error: " + e, event.threadID, event.messageID)
  }
}