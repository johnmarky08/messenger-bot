module.exports.config = {
  name: "credits",
  des: "Credits To The Following!",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 0
}
module.exports.start = async function({ event, api }) {
  const res = require(__dirname + "/assets/credits.json");
  const list = res.credits,
    author = res.authors;
  var msg = "";
  var msg2 = "";
  for (var i = 0; i < list.length; i++) {
    msg += `• ${list[i]}\n`
  }
  for (var i = 0; i < author.length; i++) {
    msg2 += `• ${author[i]}\n`
  }
  return api.sendMessage("📣 CREDITS TO THE FOLLOWING📣\n⟩» MUICHIRO PROJECT «⟨\n\nCreator: John Marky Natividad\nFB: www.facebook.com/johnmarky.natividad\n\nFeel Free To Visit And Use My APIs:\n\nhttps://muichiro-api.onrender.com\n\n『 API AND NPM PACKAGES USED IN THIS PROJECT 』\n" + msg + "\n『 OTHER AUTHORS/CONTRIBUTORS OF THE COMMANDS 』\n" + msg2, event.threadID, event.messageID)
}