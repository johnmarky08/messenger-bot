module.exports.config = {
  name: "cmd",
  des: "Run Bash",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  const { exec } = require("child_process");
  var code = global.msg;
  try {
    exec(code, (error, stdout, stderr) => {
      if (error) {
        api.sendMessage("🔴 " + error.message, event.threadID, event.messageID);
        return;
      }
      if (stderr) {
        api.sendMessage("🟠 " + stderr, event.threadID, event.messageID);
        return;
      }
      api.sendMessage("🟢 " + stdout, event.threadID, event.messageID);
    });
  } catch {
    return api.sendMessage("Something Went Wrong...", event.threadID, event.messageID)
  }
}