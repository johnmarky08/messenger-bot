module.exports.config = {
  name: "pin",
  des: "Pin Something (Image or Text)",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  try {
    const path = require("path"),
      fs = require("fs-extra"),
      request = require("request"),
      pinPath = path.join(__dirname, "assets", "pin.json"),
      msg = global.msg.split(" "),
      pin = require(__dirname + "/assets/pin.json");
    if (!msg) {
      return global.chat(global.langText("commands", "noText"))
    } else {
      if (msg[0].toLowerCase() === "show") {
        if (msg[1].toLowerCase() === "text") return global.chat(pin.text)
        else if (msg[1].toLowerCase() === "image") {
          var ccb = () => api.sendMessage({
            attachment: fs.createReadStream(__dirname + "/cache/pin.png")
          }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/pin.png"), event.messageID);
          return request(pin.image).pipe(fs.createWriteStream(__dirname + '/cache/pin.png')).on('close', () => ccb())
        } else if (msg[1].toLowerCase() === "video") {
          var ccb = () => api.sendMessage({
            attachment: fs.createReadStream(__dirname + "/cache/pin.mp4")
          }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/pin.mp4"), event.messageID);
          return request(pin.video).pipe(fs.createWriteStream(__dirname + '/cache/pin.mp4')).on('close', () => ccb())
        } else return global.chat("Choose Only Between Text, Image Or Video To Show!")
      } else if (msg[0].toLowerCase() === "text") {
        if (!global.events.admin(event.senderID)) return api.sendMessage(global.langText("settings", "adminOnly"), event.threadID, event.messageID)
        pin.text = msg.slice(1).join(" ")
        fs.writeFileSync(pinPath, JSON.stringify(pin, null, 2), 'utf-8');
        return global.chat("Successfuly Pinned Text: " + pin.text)
      } else if (msg[0].toLowerCase() === "image") {
        if (!global.events.admin(event.senderID)) return api.sendMessage(global.langText("settings", "adminOnly"), event.threadID, event.messageID)
        if (event.type == "message_reply") var img = event.messageReply.attachments[0].url
        else if (msg) {
          if (!global.events.isUrlValid(msg)) return global.chat("Invalid Link!")
          img = msg
        }
        else return global.chat("Not An Image!")
        pin.image = img
        fs.writeFileSync(pinPath, JSON.stringify(pin, null, 2), 'utf-8');
        return global.chat("Successfully Pinned The Image You Mentioned!")
      } else if (msg[0].toLowerCase() === "video") {
        if (!global.events.admin(event.senderID)) return api.sendMessage(global.langText("settings", "adminOnly"), event.threadID, event.messageID)
        if (event.type == "message_reply") var vid = event.messageReply.attachments[0].url
        else if (msg) {
          if (!global.events.isUrlValid(msg)) return global.chat("Invalid Link!")
          vid = msg
        }
        else return global.chat("Not A Video!")
        pin.video = vid
        fs.writeFileSync(pinPath, JSON.stringify(pin, null, 2), 'utf-8');
        return global.chat("Successfully Pinned The Video You Mentioned!")
      } else global.chat("Please Choose Between Show, Text Or Image First!")
    }
  } catch (e) {
    global.chat("Something Went Wrong: " + e)
  }
}