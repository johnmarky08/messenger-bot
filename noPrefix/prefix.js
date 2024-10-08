module.exports.config = {
  name: "prefix",
  nodeDepends: {},
  keys: [
    "prefix"
  ],
  des: "Bot Prefix",
  author: "John Arida",
  version: "1.0.0"
};

module.exports.start = async function({ event, api }) {
  return api.sendMessage({
    body: "» " + global.PREFIX + " «"
  }, event.threadID, event.messageID)
}