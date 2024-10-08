module.exports.config = {
  name: "off",
  des: "Turn The Bot Off",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  api.sendMessage("Good Bye!", event.threadID, event.messageID);
  return api.sendMessage("Shutting Down...", event.threadID, () => process.exit(0))
}