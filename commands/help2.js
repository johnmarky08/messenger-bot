module.exports.config = {
  name: "help2",
  des: "Commands Informations",
  nodeDepends: {},
  author: "Administrator",
  version: "3.4.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  var john = global.msg;
  if (john.toLowerCase() == "all") {
    api.sendMessage("⚙️ Initializing... Please Wait.", event.threadID, event.messageID);
    const scanDir = require(`${__dirname}/../settings/scanDir.js`);
    const fs = require("fs-extra");
    const path = require("path");
    const axios = require("axios");
    var res = await axios.get("https://muichiro-api.onrender.com/facts?api_key=muichiro");
    var factss = res.data.data;
    let text = "";
    var list = scanDir(".js", path.join(__dirname, "..", "commands"));
    var listFile = [];
    for (var i = 0; i < list.length; i++) {
      var check = path.join(__dirname, "..", "commands", list[i]);
      if (!fs.lstatSync(check).isDirectory()) {
        listFile.push(list[i].replace(".js", ""));
      }
    }
    for (var i = 0; i < list.length; i++) {
      listFile[i] = listFile[i][0].toUpperCase() + listFile[i].slice(1);
    }
    for (let i = 0; i < listFile.length; i++) {
      text += `〘 ${i + 1} 〙 ` + global.config.PREFIX + listFile[i] + "\n     ➢  " + global.plugins.command[listFile[i].toLowerCase()].des + "\n";
    }
    return api.sendMessage(`『 LIST OF COMMANDS 』\n\n` + text + "\n[ DYK ]: " + factss + `\n\nThere Are Currently A Total Of ` + listFile.length + ` Commands Available In ` + global.config.BOTNAME + ` Bot`, event.threadID);
  } else return api.sendMessage(`Type "${global.config.PREFIX}help2 all" to see all commands.`, event.threadID, event.messageID)
}