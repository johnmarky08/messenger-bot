module.exports.config = {
  name: "unsend",
  des: "Unsend Bot Messages",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  if (event.type != "message_reply") {
    return api.sendMessage("Reply A Bot Message That You Want To Unsend", event.threadID, event.messageID)
  } else if (event.messageReply.senderID != api.getCurrentUserID()) {
    return api.sendMessage("Can't Unsend Other People's Messages!", event.threadID, event.messageID);
  } else {
    return api.unsendMessage(event.messageReply.messageID)
  }
}