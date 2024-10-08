module.exports.config = {
  name: "help",
  des: "Commands Informations",
  nodeDepends: {},
  author: "Administrator",
  version: "3.4.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const scanDir = require(`${__dirname}/../settings/scanDir.js`);
  const fs = require("fs-extra");
  const path = require("path");
  const axios = require("axios");
  const request = require("request");
  var john = global.msg.split(" ");
  try {
    try {
      var commandInfo = require(path.join(__dirname, "..", "commands", `${john[0]}.js`)).config;
      var p = commandInfo.perm,
        _perm = p == 1 ? "Admins" : p == 2 ? "On Maintenance" : p == 3 ? "John Marky" : "Everyone";
      return api.sendMessage("📝 DESCRIPTION OF " + john[0].toUpperCase() + "\n\n» Name: " + commandInfo.name + "\n» Version: " + commandInfo.version + "\n» Description: " + global.plugins.command[john[0]].des + "\n» Author: " + commandInfo.author + "\n» Has Permission: " + _perm, event.threadID);
    } catch {
      var commandInfo = require(`${__dirname}/../noPrefix/${john[0]}.js`).config;
      var listFile = [];
      var text = commandInfo.keys.join(", ");
      return api.sendMessage("📝 DESCRIPTION OF " + john[0].toUpperCase() + "\n\n» Name: " + commandInfo.name + "\n» Version: " + commandInfo.version + "\n» Description: " + commandInfo.des + "\n» Author: " + commandInfo.author + "\n» Keys: " + text, event.threadID);
    }
  } catch {
    var one = 10;
    var page = parseInt(john[0]) || 1;
    var slice = one * page - one;
    var res = await axios.get("https://muichiro-api.onrender.com/facts?api_key=muichiro");
    var factss = res.data.data;
    if (john[0].toLowerCase() == "noprefix") {
      let text = "";
      var list = scanDir(".js", path.join(__dirname, "..", "noPrefix"));
      var listFile = [];
      for (var i = 0; i < list.length; i++) {
        var check = path.join(__dirname, "..", "noPrefix", list[i]);
        if (!fs.lstatSync(check).isDirectory()) {
          listFile.push(list[i].replace(".js", ""));
        }
      }
      for (var i = 0; i < list.length; i++) {
        listFile[i] = listFile[i][0].toUpperCase() + listFile[i].slice(1);
      }
      listFile.sort((a, b) => a.data - b.data);
      var tpage = Math.ceil(listFile.length / one);
      if (page > tpage) return
      const bago = listFile.slice(slice, slice + one);
      for (let item of bago) {
        text += `〘 ${++slice} 〙 ` + item + "\n";
      }
      return api.sendMessage(`『 LIST OF NO PREFIX COMMANDS 』\n\n` + text + "\n[ DYK ]: " + factss + `\n\n➣ Page ` + page + "/" + tpage + `\n\nThere Are Currently A Total Of ` + listFile.length + ` No Prefix Commands Available In ` + global.config.BOTNAME + ` Bot`, event.threadID);
    }
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
    listFile.sort((a, b) => a.data - b.data);
    var tpage = Math.ceil(listFile.length / one);
    if (page > tpage) return
    const bago = listFile.slice(slice, slice + one);
    for (let item of bago) {
      text += `〘 ${++slice} 〙 ` + global.config.PREFIX + item + "\n";
    }
    return api.sendMessage(`『 LIST OF COMMANDS 』\n\n` + text + "\n[ DYK ]: " + factss + `\n\n➣ Page ` + page + "/" + tpage + `\n\nThere Are Currently A Total Of ` + listFile.length + ` Commands Available In ` + global.config.BOTNAME + ` Bot`, event.threadID, event.messageID)
  }
}