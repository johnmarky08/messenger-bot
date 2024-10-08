module.exports.config = {
  name: "teach",
  des: "Teach Simsimi",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  try {
    var msg = global.msg.split(" | ");
    if (!msg) return api.sendMessage("Wrong Format!\n" + global.config.PREFIX + "teach Your Ask | My Answer", event.threadID, event.messageID);
    else if (!msg[0]) return api.sendMessage("Wrong Format!\n" + global.config.PREFIX + "teach Your Ask | My Answer", event.threadID, event.messageID);
    else if (!msg[1]) return api.sendMessage("Wrong Format!\n" + global.config.PREFIX + "teach Your Ask | My Answer", event.threadID, event.messageID);
    const axios = require("axios"),
      { data: res } = await axios.get(`https://tanjiro-sim-teach.onrender.com/teach?ask=${msg[0]}&ans=${msg[1]}`);
    return api.sendMessage("You're Ask: " + res.result[0].ask + "\nMy Answer: " + msg[1], event.threadID, event.messageID);
  } catch (err) {
    return api.sendMessage("Error: " + err, event.threadID, event.messageID)
  }
}