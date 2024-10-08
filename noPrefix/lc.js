module.exports.config = {
  name: "lc",
  nodeDepends: {},
  keys: [
    "lastchat", "lc", "last chat"
  ],
  des: "No Prefix Last Chat",
  author: "John Arida",
  version: "1.0.0"
};

module.exports.start = async function({ event, api }) {
  let msg = "╭────༺♡༻────╮\n       In Loving Memories\n        —𝐋𝐀𝐒𝐓 𝐂𝐇𝐀𝐓—\n╰────༺♡༻────╯"
  api.setMessageReaction("🥀", event.messageID, (err) => { }, true);
  api.sendMessage(msg, event.threadID, event.messageID)
}