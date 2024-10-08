module.exports.config = {
  name: "sim",
  des: "Chat With Simsimi",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const msg = global.msg;
  if (!msg) return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID);
  try {
    const axios = require("axios"),
      { data: res } = await axios.get("https://tanjiro-sim-teach.onrender.com/sim?ask=" + msg);
    const random = Math.floor(Math.random() * res.result[0].ans.length);
    return api.sendMessage(res.result[0].ans[random], event.threadID, event.messageID)
  } catch {
    return api.sendMessage("Master, I Don't Know What You're Talking About, Please Teach Me!\n\nTo Teach Me, Type " + global.config.PREFIX + "teach Your Ask | My Answer\nEx: " + global.config.PREFIX + "teach Hi | Hello", event.threadID, event.messageID)
  }
}