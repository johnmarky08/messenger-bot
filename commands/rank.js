module.exports.config = {
  name: "rank",
  des: "Your Rank In Global",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const axios = require("axios"),
    { data } = await axios.get("https://tanjiro-rank-user.onrender.com/all"),
    rk = data.result,
    rank = rk.find(a => a.uid === event.senderID),
    ma = `${rank.lvl}00`,
    max = parseInt(ma) / 2,
    request = require("request"),
    fs = require("fs-extra");
  rk.sort((a, b) => {
    if (a.exp > b.exp) return -1;
    if (a.exp < b.exp) return 1;
  });
  var index = rk.indexOf(rank) + 1;
  let stt = "th";
  if (index.toString().endsWith("1")) stt = "st"
  else if (index.toString().endsWith("2")) stt = "nd"
  else if (index.toString().endsWith("3")) stt = "rd"
  var callback = () => api.sendMessage({
    body: `[ GLOBAL ] You're ${index}${stt} Placed Out Of ${rk.length} People`,
    attachment: fs.createReadStream(__dirname + "/cache/8.png")
  }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/8.png"));
  return request(encodeURI(`https://muichiro-api.onrender.com/rank?api_key=muichiro&uid=${event.senderID}&name=${await global.Users.get(event.senderID)}&max=${max}&exp=${rank.exp}&lvl=${rank.lvl}&rank=https://i.postimg.cc/HLrKXTKR/Project-1-removebg-preview.png`)).pipe(fs.createWriteStream(__dirname + '/cache/8.png')).on('close', () => callback());
}