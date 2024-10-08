module.exports.config = {
  name: "hi",
  nodeDepends: {},
  keys: [
    "bot", global.config.BOTNAME.toLowerCase()
  ],
  des: "No Prefix Hello",
  author: "Sam",
  version: "1.0.0"
};

module.exports.start = async function({ event, api }) {
  var name = await global.Users.get(event.senderID);
  let mentions = [];
  mentions.push({
    tag: name,
    id: event.senderID
  })
  let msg = { body: `Hi ${name || "Facebook User"}, ${global.config.BOTNAME} is Online!\n\n\u0022\u0054\u0041\u004E\u004A\u0049\u0052\u004F\u0020\u0050\u0052\u004F\u004A\u0045\u0043\u0054\u0020\u002D\u0020\u0042\u0079\u0020\u004A\u006F\u0068\u006E\u0020\u0041\u0072\u0069\u0064\u0061\u0022`, mentions }
  api.setMessageReaction("✔️", event.messageID, (err) => { }, true);
  api.sendMessage(msg, event.threadID, event.messageID)
}