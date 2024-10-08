module.exports.config = {
  name: "admin",
  des: "Admin Category",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.1",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const fs = require("fs-extra");
  const configPath = `${process.cwd()}/config.json`;
  const { ADMIN } = global.config;
  var config = require(configPath);
  var john = global.msg.split(" ");
  switch (john[0]) {
    case "list":
    case "all": {
      var listAdmin = ADMIN || config.ADMIN || [];
      const msg = [];
      for (const idAdmin of listAdmin) {
        var name = await global.Users.get(idAdmin);
        msg.push(`- ${name}\nhttps://facebook.com/${idAdmin}`);
      }
      return api.sendMessage("» ADMIN LIST «\n\n" + msg.join("\n"), event.threadID, event.messageID);
    };
      break;
    case "add": {
      if (!global.config.ADMIN.includes(event.senderID)) return api.sendMessage(global.langText("settings", "adminOnly"), event.threadID, event.messageID);
      var { mentions } = event;
      var mention = Object.keys(mentions);
      if (mention.length != 0 && isNaN(john[1])) {
        var listAdd = [];
        for (var id of mention) {

          config.ADMIN.push(id);
          listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
        };
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
        return api.sendMessage(`Added ${mention.length} New Admins :\n\n${listAdd.join("\n").replace(/\@/g, "")} `, event.threadID, event.messageID);
      }
      else if (john.length != 0 && !isNaN(john[1])) {

        config.ADMIN.push(john[1]);
        var name = await global.Users.get(john[1]);
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
        return api.sendMessage(`Added 1 New Admin :\n\n${`[ ${john[1]} ] » ${name}`}`, event.threadID, event.messageID);
      }
      else return console.log("An Unexpected Error Occured!");
    };
      break;
    case "remove":
    case "rm":
    case "delete": {
      if (!global.config.ADMIN.includes(event.senderID)) return api.sendMessage(global.langText("settings", "adminOnly"), event.threadID, event.messageID);
      var { mentions } = event;
      var mention = Object.keys(mentions);
      if (mentions.length != 0 && isNaN(john[1])) {
        var listAdd = [];
        for (var id of mention) {
          var index = config.ADMIN.findIndex(item => item == id);

          config.ADMIN.splice(index, 1);
          listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
        };
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
        return api.sendMessage(`Removed ${mention.length} Admins:\n\n${listAdd.join("\n").replace(/\@/g, "")}`, event.threadID, event.messageID);
      }
      else if (john.length != 0 && !isNaN(john[1])) {
        var index = config.ADMIN.findIndex(item => item.toString() == john[1]);

        config.ADMIN.splice(index, 1);
        var name = await global.Users.get(john[1]);
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
        return api.sendMessage(`Removed 1 Admin:\n\n[ ${john[1]} ] » ${name}`, event.threadID, event.messageID);
      }
      else return console.log("An Unexpected Error Occured!");
    };
      break;
    default: {
      return console.log("An Unexpected Error Occured By Default!");
    }
  }
}