module.exports.config = {
  name: "rmping",
  des: "Remove A Website To Ping",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 2
};

module.exports.start = async function({ event, api }) {
  try {
    const msg = global.msg;
    if (!msg) return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID)
    const isUrlValid = global.events.isUrlValid(msg);
    if (!isUrlValid) return api.sendMessage("Not A Valid Link!", event.threadID, event.messageID)
    const axios = require("axios"),
      { data } = await axios.get("https://Tanjiro-Ping.tanjiro-senpai.repl.co/remove?link=" + msg);
    if (data.code === 411) return api.sendMessage("Your Link Is Not Added To Ping Yet!", event.threadID, event.messageID)
    return api.sendMessage("Successfully Removed This Link To Ping!!\n\n" + msg, event.threadID, event.messageID)
  } catch (e) {
    return console.error(e)
  }
}