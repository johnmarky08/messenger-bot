module.exports.config = {
  name: "bible",
  des: "Bible Verses",
  nodeDepends: {},
  author: "John Arida",
  version: "2.0.0",
  perm: 0
}
module.exports.start = async function({ event, api }) {
  const axios = require("axios");
  const request = require("request");
  const fs = require("fs");
  const ros = await axios.get(`https://beta.ourmanna.com/api/v1/get?format=json&order=daily`);
  const name1 = ros.data.verse.details.reference;
  const text1 = ros.data.verse.details.text;
  const res = await axios.get(`https://beta.ourmanna.com/api/v1/get?format=json&order=random`);
  const name = res.data.verse.details.reference;
  const text =
    res.data.verse.details.text;
  var pist = () => api.sendMessage(`Bible Verse Of The Day!\n\n"${text1}"\n\n- ${name1}`, event.threadID);
  var john = global.msg;
  if (john == "daily") return pist();
  if (john == "help") return api.sendMessage(`Don't Know Where To Go?\n\n${global.config.PREFIX}bible - »Random bible verses«\n${global.config.PREFIX}bible daily - »The verse of the day«\n${global.config.PREFIX}bible [text] - »Search a verse that you want«`, event.threadID, event.messageID);
  var pist2 = () => api.sendMessage(`"${text}"\n\n- ${name}`, event.threadID);
  if (!john) return pist2();
  const ris = await axios.get(`https://bible-api.com/${john}`);
  const name2 = ris.data.reference;
  const text2 = ris.data.text;
  var pist3 = () => api.sendMessage(`Bible Verse That You Search..\n\n========\n     ${text2}- ${name2}\n\n=================`, event.threadID);
  return pist3()
}