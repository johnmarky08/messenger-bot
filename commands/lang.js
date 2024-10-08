module.exports.config = {
  name: "lang",
  des: "Change Bot's Language",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  const path = require("path"),
    fs = require("fs-extra"),
    langPath = path.join(__dirname, "..", "config.json"),
    msg = global.msg,
    language = require(__dirname + "/../language/lang.json");
  let lang = require(langPath);
  let _lang = global.config.language;
  if (!msg) {
    if (_lang === "en") {
      lang.language = "tl";
      fs.writeFileSync(langPath, JSON.stringify(lang, null, 2), 'utf-8');
      return api.sendMessage("Language Has Been Successfully Changed Into Tagalog (tl)", event.threadID, event.messageID)
    } else {
      lang.language = "en";
      fs.writeFileSync(langPath, JSON.stringify(lang, null, 2), 'utf-8');
      return api.sendMessage("Language Has Been Successfully Changed Into English (en)", event.threadID, event.messageID)
    }
  } else {
    if (language[msg]) {
      lang.language = msg;
      fs.writeFileSync(langPath, JSON.stringify(lang, null, 2), 'utf-8');
      return api.sendMessage("Language Has Been Successfully Changed Into " + msg.toUpperCase(), event.threadID, event.messageID)
    } else {
      return api.sendMessage("The Language You Just Entered Is Not Available!", event.threadID, event.messageID)
    }
  }
}