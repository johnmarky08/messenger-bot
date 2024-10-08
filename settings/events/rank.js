const axios = require("axios");

module.exports.rank = async function({ event, api }) {
  const idd = await api.getCurrentUserID();
  const uid = event.senderID;
  if ((event.type === "message") && (event.senderID !== idd)) {
    axios.get(`https://tanjiro-rank-user.onrender.com/update?uid=${uid}`).then((res) => {
      const exp = res.data.result[0].exp;
      const lvl = res.data.result[0].lvl;
      if ((exp % 50) == 0) {
        global.events.rankup({ event, api, uid, lvl });
      }
    })
    return
  } else {
    return
  }
}