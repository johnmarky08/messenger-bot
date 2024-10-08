module.exports.config = {
  name: "unicode",
  des: "Input To Unicode Sequence",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 3
};

module.exports.start = async function({ event, api }) {
  var msg = global.msg.split(" | ");
  if (!msg[0]) return global.chat(global.langText("commands", "noText"))
  var res = await global.events.unicode(msg[0], msg[1] || null, msg[2] || null)
  return api.sendMessage(res, event.threadID, event.messageID);
}