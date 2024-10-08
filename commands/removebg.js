module.exports.config = {
  name: "removebg",
  des: "Remove Image Background",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  try {
    const fs = require("fs-extra");
    const { removeBackgroundFromImageUrl } = require("remove.bg");
    const url = event.messageReply.attachments[0].url;
    const outputFile = `${__dirname}/cache/removebg.png`;
    await removeBackgroundFromImageUrl({
      url,
      apiKey: global.config.removebg,
      size: "preview",
      type: "auto",
      outputFile
    });
    api.sendMessage({ attachment: fs.createReadStream(__dirname + "/cache/removebg.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/removebg.png"), event.messageID);
  } catch {
    return api.sendMessage(global.langText("commands", "noReply"), event.threadID, event.messageID);
  }
}