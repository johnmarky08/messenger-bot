module.exports.config = {
  name: "setnn",
  des: "Set Nickname",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  try {
    const msg = global.msg || "";
    let uid = event.senderID;
    if (event.type == "message_reply") { uid = event.messageReply.senderID }
    return api.changeNickname(msg, event.threadID, uid);
  } catch {
    return global.chat("Something Went Wrong")
  }
}