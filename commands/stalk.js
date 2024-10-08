module.exports.config = {
  name: "stalk",
  des: "Stalk Someone On Facebook",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  var msg = global.msg;
  if (!msg) { var msg = event.senderID }
  if (event.type == "message_reply") { msg = event.messageReply.senderID }
  if (msg.indexOf('@') !== -1) { msg = Object.keys(event.mentions)[0] }
  const axios = require("axios"),
    request = require("request"),
    fs = require("fs-extra");
  try {
    var { data: b } = await axios.get("https://tanjiro-facebook-user.onrender.com/get?uid=" + msg),
      a = b.result[0];
    if (!a.name) {
      var a = await api.getUserInfo(msg)[msg];
      var callback = () => api.sendMessage(
        { body: `❦ 𝙐𝙨𝙚𝙧 𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙩𝙞𝙤𝙣\n━━━━━━━━━━━━━━━━━\n\n• 𝙐𝙨𝙚𝙧𝙄𝘿: ${a.id}\n• 𝙉𝙖𝙢𝙚: ${a.name}\n• 𝙐𝙨𝙚𝙧𝙉𝙖𝙢𝙚: ${a.username}\n• 𝙂𝙚𝙣𝙙𝙚𝙧: ${a.gender == 1 ? "Female" : a.gender == 2 ? "Male" : "Trans"}\n• 𝙇𝙞𝙣𝙠: ${a.link}\n• 𝘽𝙞𝙧𝙩𝙝𝙙𝙖𝙮: ${a.birthday || "No data"}\n• 𝙁𝙤𝙡𝙡𝙤𝙬𝙚𝙧𝙨: ${a.follow || "No data"}\n• 𝘼𝙗𝙤𝙪𝙩: ${a.about || "No data"}\n• 𝙀𝙢𝙖𝙞𝙡: ${a.email || "No data"}\n• 𝙏𝙤𝙬𝙣: ${a.hometown !== "No data" ? a.hometown.name : "No data"}\n• 𝙎𝙩𝙖𝙩𝙪𝙨: ${a.relationship_status || "No data"}`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
      return request(encodeURI(`https://graph.facebook.com/${a.id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
    }
    let town = "No data";
    if (a.town !== "No data") town = a.town.name;
    var callback = () => api.sendMessage({
      body: `❦ 𝙐𝙨𝙚𝙧 𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙩𝙞𝙤𝙣\n━━━━━━━━━━━━━━━━━\n\n• 𝙐𝙨𝙚𝙧𝙄𝘿: ${a.uid}\n• 𝙉𝙖𝙢𝙚: ${a.name}\n• 𝙐𝙨𝙚𝙧𝙉𝙖𝙢𝙚: ${a.username}\n• 𝙂𝙚𝙣𝙙𝙚𝙧: ${a.gender}\n• 𝙇𝙞𝙣𝙠: ${a.link}\n• 𝘽𝙞𝙧𝙩𝙝𝙙𝙖𝙮: ${a.bday}\n• 𝙁𝙤𝙡𝙡𝙤𝙬𝙚𝙧𝙨: ${a.followers}\n• 𝘼𝙗𝙤𝙪𝙩: ${a.about}\n• 𝙀𝙢𝙖𝙞𝙡: ${a.email}\n• 𝙏𝙤𝙬𝙣: ${town}\n• 𝙎𝙩𝙖𝙩𝙪𝙨: ${a.status}`,
      attachment: fs.createReadStream(__dirname + "/cache/1.png")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
    return request(encodeURI(`https://graph.facebook.com/${a.uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
  } catch (e) {
    global.chat(e)
  }
}