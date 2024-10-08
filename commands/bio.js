module.exports.config = {
  name: "bio",
  des: "Change The Bots Bio",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  var msg = global.msg;
  if (!msg) return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID)
  api.changeBio(msg, (e) => {
    if (e) api.sendMessage("An error occurred:\n" + e, event.threadID); return api.sendMessage("Changed Bot's Bio To :\n\n" + msg, event.threadID, event.messgaeID)
  }
  )
}