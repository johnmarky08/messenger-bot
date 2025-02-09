module.exports.config = {
  name: "sayHi",
  nodeDepends: {},
  keys: [
    "yo", "hello", "hai", "chào", "chao", "hí", "híí", "hì", "hìì", "lô", "hii", "helo", "halo", "hi"
  ],
  des: "No Prefix Hello",
  author: "Sam",
  version: "1.0.0"
};

module.exports.start = async function({ event, api }) {
  let data = [
    "526214684778630", "526220108111421", "526220308111401", "526220484778050", "526220691444696", "526220814778017", "526220978111334", "526221104777988", "526221318111300", "526221564777942", "526221711444594", "526221971444568", "2041011389459668", "2041011569459650", "2041011726126301", "2041011836126290", "2041011952792945", "2041012109459596", "2041012262792914", "2041012406126233", "2041012539459553", "2041012692792871", "2041014432792697", "2041014739459333", "2041015016125972", "2041015182792622", "2041015329459274", "2041015422792598", "2041015576125916", "2041017422792398", "2041020049458802", "2041020599458747", "2041021119458695", "2041021609458646", "2041022029458604", "2041022286125245"
  ];
  let sticker = data[Math.floor(Math.random() * data.length)];
  let moment = require("moment-timezone");
  let hours = moment.tz('Asia/Manila').format('HHmm');
  let session = (
    hours > 0001 && hours <= 400 ? "bright morning" :
      hours > 401 && hours <= 700 ? "morning" :
        hours > 701 && hours <= 1000 ? "shining morning" :
          hours > 1001 && hours <= 1200 ? "lunch" :
            hours > 1201 && hours <= 1700 ? "afternoon" :
              hours > 1701 && hours <= 1800 ? "gloaming afternoon" :
                hours > 1801 && hours <= 2100 ? "evening" :
                  hours > 2101 && hours <= 2400 ? "late night" :
                    "error");
  var name = await global.Users.get(event.senderID);
  var mentions = [];
  mentions.push({
    tag: name,
    id: event.senderID
  });
  api.setMessageReaction("🤩", event.messageID, (err) => { }, true);
  return api.sendMessage({
    body: `Hi ${name}, have a good ${session}!`,
    mentions
  }, event.threadID, () => {
    setTimeout(() => {
      api.sendMessage({ sticker: sticker }, event.threadID);
    }, 100)
  }, event.messageID)
}