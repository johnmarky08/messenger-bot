module.exports.config = {
  name: "out",
  des: "Out The Bot To A Gc",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  var john = global.msg;
  if (!john) {
    api.removeUserFromGroup(api.getCurrentUserID(), event.threadID)
  } else {
    api.removeUserFromGroup(api.getCurrentUserID(), john)
    return api.sendMessage("Bot Outed In " + john + " Thread ID", event.threadID, event.messageID)
  }
}