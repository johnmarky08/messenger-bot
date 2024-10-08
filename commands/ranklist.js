module.exports.config = {
  name: "ranklist",
  des: "Rank Based On Users Exp",
  nodeDepends: {},
  author: "John Arida",
  version: "2.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const axios = require("axios"),
    { data } = await axios.get("https://tanjiro-rank-user.onrender.com/all"),
    _user = data.result;
  let list = "";

  _user.sort((a, b) => {
    if (a.exp > b.exp) return -1;
    if (a.exp < b.exp) return 1;
  })
  for (var i = 0; i < 10; i++) {
    var name = await global.Users.get(_user[i].uid);
    list += `${i + 1}. ${name} (Lvl. ${_user[i].lvl})\n`
  }
  return api.sendMessage(`[ GLOBAL ] Top 10 Users On ${global.config.BOTNAME}  Bot!\n\n` + list, event.threadID, event.messageID)
}