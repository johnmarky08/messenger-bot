module.exports.config = {
  name: "restart",
  des: "Restart The Bot",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  return api.sendMessage("🐸 Restarting...", event.threadID, () => process.exit(1), () => process.on())
}