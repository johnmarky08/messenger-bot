module.exports.config = {
  name: "fbcover",
  des: "Facebook Cover V1",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 2
};

module.exports.start = async function({ event, api }) {
  const request = require("request"),
    fs = require("fs-extra"),
    msg = global.msg.split(" | ");
  let uid = event.senderID;
  if (event.type == "message_reply") { uid = event.messageReply.senderID }
  if (msg.length !== 6) return api.sendMessage("Wrong Format!!\n\nFormat:\n" + global.config.PREFIX + "fbcover <Your Name> | <Subname> | <Address> | <Email> | <Number> | <Color>\n\nExample:\n" + global.config.PREFIX + "fbcover John Arida | Dev | Philippines | N/A | 09123456789 | Cyan", event.threadID, event.messageID)
  var callback = () => api.sendMessage({
    body: `» Name: ${msg[0]}\n» Subname: ${msg[1]}\n» Address: ${msg[2]}\n» Email: ${msg[3]}\n» Number: ${msg[4]}\n» Color: ${msg[5]}\n» Uid: ${uid}`,
    attachment: fs.createReadStream(__dirname + "/cache/fb.png")
  }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/fb.png"));
  return request(encodeURI(`https://api.reikomods.repl.co/canvas/fbcover?name=${msg[0]}&color=${msg[5]}&address=${msg[2]}&email=${msg[3]}&subname=${msg[1]}&sdt=${msg[4]}&uid=${uid}`)).pipe(fs.createWriteStream(__dirname + '/cache/fb.png')).on('close', () => callback());
}