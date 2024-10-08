module.exports.register = async function({ event, api }) {
  const { participantIDs } = await api.getThreadInfo(event.threadID);
  async function reg(uid) {
    try {
      try {
        const axxios = require("axios"),
          resss = await axxios.get(`https://tanjiro-facebook-user.onrender.com/get?uid=${uid}`);
        if (resss.data.result[0].uid == uid) {
          return
        }/* else if (api.getUserInfoV2) {
        const axios = require("axios");
        var a = await api.getUserInfoV2(uid),
          name = a.name,
          username = a.username,
          status = a.relationship_status,
          gender = a.gender,
          link = a.link,
          bday = a.birthday,
          followers = a.follow,
          about = a.about,
          email = a.email,
          town = a.hometown.name,
          uid = a.id;
        const b = await axios.get(`https://tanjiro-facebook-users.tanjiro-senpai.repl.co/set?uid=${uid}&name=${name}&username=${username}&status=${status}&gender=${gender}&link=${link}&bday=${bday}&followers=${followers}&about=${about}&email=${email}&town=${town}`)
        return console.loaded("New Added User: " + b.data.result.name + " - " + b.data.result.uid)
      } else {*/
      } catch (e) {
        const axios = require("axios");
        var a = (await api.getUserInfo(uid))[uid],
          name = a.name,
          username = a.vanity,
          gender = a.gender == 1 ? "Female" : a.gender == 2 ? "Male" : "Trans",
          link = a.profileUrl;
        const b = await axios.get(`https://tanjiro-facebook-user.onrender.com/set?uid=${uid}&name=${name}&username=${username}&gender=${gender}&link=${link}`)
        return console.loaded("New Added User: " + b.data.result[0].name + " - " + b.data.result[0].uid)
        //}
      }
    } catch (e) {
      return console.error("Users: Something Went Wrong! " + e)
    }
  }
  for (var i = 0; i < participantIDs.length; i++) {
    reg(participantIDs[i])
  }
}

module.exports.get = async function(data) {
  try {
    try {
      const axios = require("axios"),
        res = await axios.get(`https://tanjiro-facebook-user.onrender.com/get?uid=${data}`);
      return res.data.result[0].name
    } catch {
      return global.userName(data)
    }
  } catch {
    return "Facebook User"
  }
}