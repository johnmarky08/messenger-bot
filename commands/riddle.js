module.exports.config = {
  name: "riddle",
  des: "Random Riddles With Answers",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function ({ event, api }) {
  const axios = require("axios");
  const options = {
    method: 'GET',
    url: 'https://riddles-by-api-ninjas.p.rapidapi.com/v1/riddles',
    headers: {
      'X-RapidAPI-Key': 'e712ba46admsh2861ddc6dbd65b2p18b26ajsn09208fae3a3c',
      'X-RapidAPI-Host': 'riddles-by-api-ninjas.p.rapidapi.com'
    }
  };
  const res = await axios.request(options);
  function que() {
    return api.sendMessage(`Title: ${res.data[0].title}\n\nRiddle: ${res.data[0].question}\n\n( The Answer Will Be Sent After 10secs )`, event.threadID, event.messageID); 
  }
  function answer() {
    return api.sendMessage(`The Answer To The Previous Riddle:\n\n"${res.data[0].answer}"`, event.threadID, event.messageID)
  }
  setTimeout(function () {
    answer();
  }, 10000)
  que()
}