module.exports.config = {
  name: "binary",
  des: "Encode or Decode Binary",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const msg = global.msg.toLowerCase();
  if (!msg) return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID);
  const axios = require("axios"),
    res = await axios.get(`https://muichiro-api.onrender.com/binary?text=${msg}&api_key=muichiro`),
    a = res.data.result;
  return api.sendMessage(a, event.threadID, event.messageID)
}