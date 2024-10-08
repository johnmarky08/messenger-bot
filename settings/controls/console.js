module.exports = async function({ event, api }) {
  var name = await global.Users.get(event.senderID);
  const chalk = require('chalk');
  var threadInfo = await api.getThreadInfo(event.threadID);
  var threadName = threadInfo.name || "Direct Message";
  var gcn = threadName === "Direct Message" ? "" : "Group Name: "
  var moment = require("moment-timezone");
  var time = moment.tz("Asia/Manila").format("LLLL");
  var nameBox = threadName;
  var nameUser = name;
  var msg = event.body || "Photos, videos or special characters";
  var job = ["FF9900", "FFFF33", "33FFFF", "FF99FF", "FF3366", "FFFF66", "FF00FF", "66FF99", "00CCFF", "FF0099", "FF0066"];
  var random =
    job[Math.floor(Math.random() * job.length)];
  var random1 = job[Math.floor(Math.random() * job.length)];
  var random2 = job[Math.floor(Math.random() * job.length)];
  var random3 = job[Math.floor(Math.random() * job.length)];
  console.message(chalk.hex("#" + random)(`${gcn}${nameBox}`) + " | " + chalk.hex("#" + random1)(`Sender Name: ${nameUser}`) + chalk.hex("#" + random2)(`\nContent: ${msg}`) + `\n` + chalk.hex("#" + random3)(`[ ${time} ]`) + `\n` + chalk.white(`◆━━━━━━━━━━◆━━━━━━━━━◆◆━━━━━━━━◆━━━━━━━━━━◆`));
}