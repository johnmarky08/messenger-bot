module.exports.config = {
  name: "uid",
  des: "Find User UID",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  let { threadID, senderID, messageID } = event;
  var john = global.msg;
  if (!john[0]) { var uid = senderID }
  if (event.type == "message_reply") { uid = event.messageReply.senderID }
  if (john.indexOf('@') !== -1) { uid = Object.keys(event.mentions)[0] }
  return api.sendMessage(uid, threadID, messageID);
}