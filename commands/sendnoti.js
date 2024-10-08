module.exports.config = {
  name: "sendnoti",
  des: "Turn The Bot Off",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  const moment = require("moment-timezone");
  const args = global.msg;
  var gio = moment.tz("Asia/Manila").format("HH:mm:ss || MM/DD/YYYY");
  const { threadID, messageID, senderID } = event;
  if (!args[0]) return api.sendMessage(global.langText("commands", "noText"), threadID);
  var inbbox = await api.getThreadList(100, null, ['INBOX']);
  let thh = [...inbbox].filter(group => group.isSubscribed && group.isGroup);
  let allThread = [];
  for (var groupInfo of thh) {
    allThread.push(groupInfo.threadID);
  }
  let text = `====[ NOTICE FROM ADMIN ]====\n\n${args}\n\n[ ${gio} ]\nMessage From Admin $name`;
  var name = await global.Users.get(senderID);
  let can = 0,
    canNot = 0;
  text = text
    .replace(/\$name/g, name);
  allThread.forEach((each) => {
    try {
      api.sendMessage(text, each).then(can + 1)
    } catch (e) { canNot + 1 }
  });
    return api.sendMessage(`Sent To ${can} Threads, Not Send To ${canNot} Threads`, threadID)
}