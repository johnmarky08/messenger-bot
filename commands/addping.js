module.exports.config = {
  name: "addping",
  des: "Add A Website To Ping",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 2
};

module.exports.start = async function({ event, api }) {
  try {
    let msg = global.msg;
    if (!msg) msg = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
    const isUrlValid = global.events.isUrlValid(msg);
    if (!isUrlValid) return api.sendMessage("Not A Valid Link!", event.threadID, event.messageID)
    const axios = require("axios"),
      { data } = await axios.get("https://Tanjiro-Ping.tanjiro-senpai.repl.co/ping?link=" + msg);
    if (data.code === 411) return api.sendMessage("Your Link Is Already Pinged!", event.threadID, event.messageID)
    return api.sendMessage("Successfully Added This Link To Ping!!\n\n" + msg, event.threadID, event.messageID)
  } catch (e) {
    return console.error(e)
  }
}