module.exports.config = {
  name: "setname",
  des: "Set Bot's Name",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  try {
    const path = require("path"),
      fs = require("fs-extra"),
      configPath = path.join(__dirname, "..", "config.json"),
      msg = global.msg,
      config = require(__dirname + "/../config.json");
    if (!msg) {
      return global.chat(global.langText("commands", "noText"))
    } else {
      config.BOTNAME = msg;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
      return global.chat("Bot's Name Has Been Successfully Changed Into: " + msg)
    }
  } catch (e) {
    global.chat("Something Went Wrong: " + e)
  }
}