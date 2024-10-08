module.exports.config = {
  name: "fbcover2",
  des: "Facebook Cover V2",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 2
};

module.exports.start = async function({ event, api }) {
  const request = require("request"),
    fs = require("fs-extra"),
    msg = global.msg.split(" | ");
  if (msg.length !== 4) return api.sendMessage("Wrong Format!!\n\nFormat:\n" + global.config.PREFIX + "fbcover2 <Id> | <Your Name> | <Subname> | <Color>\n\nExample:\n" + global.config.PREFIX + "fbcover2 7 | John Arida | Dev | LightBlue", event.threadID, event.messageID)
  var callback = () => api.sendMessage({
    body: `» Name: ${msg[1]}\n» Subname: ${msg[2]}\n» Color: ${msg[3]}\n» ID: ${msg[0]}`,
    attachment: fs.createReadStream(__dirname + "/cache/fb.png")
  }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/fb.png"));
  return request(encodeURI(`https://api.reikomods.repl.co/canvas/fbcoverv2?name=${msg[1]}&id=${msg[0]}&subname=${msg[2]}&color=${msg[3]}`)).pipe(fs.createWriteStream(__dirname + '/cache/fb.png')).on('close', () => callback());
}