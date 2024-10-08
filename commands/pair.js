module.exports.config = {
  name: "pair",
  des: "Pair Your Destiny",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const request = require("request");
  const fs = require("fs-extra");
  const botID = await api.getCurrentUserID();
  const { participantIDs } = await api.getThreadInfo(event.threadID);
  const listUserID = await participantIDs.filter(ID => ID != botID && ID != event.senderID);
  var lyl = ["Pair", "Friend", "Love", "Destiny", "Crush", "Babe", "Partner"];
  var lyll = Math.floor(Math.random() * lyl.length);
  var he = ["🤍", "🤎", "♥️", "❣️", "❤️", "💓", "💕", "💖", "💗", "💘", "💙", "💚", "💛", "💜", "💝", "💞", "💟", "🖤", "🧡"];
  var art = Math.floor(Math.random() * he.length);
  var num = Math.floor(Math.random() * 101);
  var id = listUserID[Math.floor(Math.random() * listUserID.length)];
  var name = await global.Users.get(event.senderID);
  var name1 = await global.Users.get(id);
  var callback = () => api.sendMessage(
    { body: `Pair Success!!\n${name} ${he[art]} ${name1}`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
  return request(encodeURI(`https://muichiro-api.onrender.com/ship?uid=${event.senderID}&uid2=${id}&name=${name}&name2=${name1}&number=${num}%&status=${lyl[lyll]}&api_key=muichiro`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
}