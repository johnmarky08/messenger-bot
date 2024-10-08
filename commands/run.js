module.exports.config = {
  name: "run",
  des: "Run A Command",
  nodeDepends:{},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function ({ event, api }){
  try {
    async function run() {
      eval(global.msg)
    }
    run()
  } catch {
    return api.sendMessage("Something Went Wrong...", event.threadID, event.messageID)
  }
}