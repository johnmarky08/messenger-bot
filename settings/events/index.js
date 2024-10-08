//////CONSTANT AND VARIABLES//////
const cron = require("node-cron"),
  moment = require("moment-timezone"),
  { exec } = require("child_process"),
  fs = require("fs-extra"),
  knights = require("knights-canvas"),
  _inout = require(__dirname + "/data/database.json").bg,
  request = require("request");
var _data = _inout[Math.floor(Math.random() * _inout.length)];
//////CONSTANT AND VARIABLES//////


//////FUNCTIONS AND GLOBALS///////
global.langText = function(...args) {
  try {
    //CREDITS TO MIRAI FOR THIS
    const lang = require(`../../language/lang.json`);
    let result = lang[global.config.language][args[0]][args[1]];
    for (var i = args.length - 1; i > 0; i--) {
      const regEx = RegExp(`%${i - 1}`, 'g');
      result = result.replace(regEx, args[i + 1]);
    }
    return result;
  } catch (e) {
    console.error(e)
  }
}

function adminTag({ event, api }) {
  if (event.senderID !== "100011316816555") {
    var aid = ["100011316816555"];
    for (const id of aid) {
      if (Object.keys(event.mentions) == id) {
        var msg = ["Don't tag admin, he's busy 😗", "Admin is currently unavailable 🤧", "Sorry, admin is offline 😪", "Do you like my admin thats why your tagging him? 😏", " My Admin is asleep, don't tag him, wake him up and reply 🥱"];
        api.setMessageReaction("😍", event.messageID, (err) => { }, true);
        api.sendMessage({ body: msg[Math.floor(Math.random() * msg.length)] }, event.threadID, event.messageID);
      }
    }
    if (event.body.toLowerCase().includes("marky") && !event.body.includes("@")) {
      api.setMessageReaction("😍", event.messageID, (err) => { }, true);
      api.sendMessage("What do you want from my admin?", event.threadID, event.messageID)
    }
  }
}

function cronss({ api }) {
  var gio = moment.tz("Asia/Manila").format("MM/DD/YYYY ]");
  cron.schedule('*/30 * * * *', () => {
    exec("rm -fr commands/cache/*.jpg && rm -fr commands/cache/*.png && rm -fr commands/cache/*.gif && rm -fr commands/cache/*.mp3 && rm -fr commands/cache/*.mp4", (error, stdout, stderr) => {
      if (error) {
        console.logg(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.logg(`stderr: ${stderr}`);
        return;
      }
      console.logg(`Successfully Auto Delete Cache!! ${stdout}`);
    }
    )
  }, {
    scheduled: true,
    timezone: "Asia/Manila"
  });
  cron.schedule('0 0 12 * * *', () => {
    return api.sendMessage(global.config.BOTNAME + " Bot Is Restarting! Please Wait...\n\n[ 12:00:00 || " + gio, 100011316816555, () => process.exit(1))
  }, {
    scheduled: true,
    timezone: "Asia/Manila"
  })
}

async function checkIfBot(uid) {
  var _res = global.config.otherBot.includes(uid)
  if (_res == false) return !0
  return !1
}

function inout({ event, api }) {
  if (event.logMessageType == "log:subscribe") {
    if (event.logMessageData.addedParticipants.some(id => id.userFbId == api.getCurrentUserID())) {
      var cb = () => api.sendMessage({
        body: `♨ Successfully Connected!\n\n𓍝 Prefix: ${global.config.PREFIX}\n\n» Please Use ${global.config.PREFIX}help For List Of Commands\n\n✵ \u004d\u0061\u0064\u0065\u0020\u0042\u0079\u003a\u0020\u004a\u006f\u0068\u006e\u0020\u004d\u0061\u0072\u006b\u0079\u0020\u004e\u0061\u0074\u0069\u0076\u0069\u0064\u0061\u0064`,
        attachment: fs.createReadStream(__dirname + "/../../commands/cache/muichiro.jpg")
      }, event.threadID, () => {
        fs.unlinkSync(__dirname + "/../../commands/cache/muichiro.jpg");
        api.changeNickname(`» ${global.config.PREFIX} « ${global.config.BOTNAME}`, event.threadID, api.getCurrentUserID())
      })
      return request(encodeURI(`https://i.imgur.com/1yexeDn.png`)).pipe(fs.createWriteStream(__dirname + '/../../commands/cache/muichiro.jpg')).on('close', () => cb());
    } else if (event.logMessageData.addedParticipants.forEach(id => {
      async function logsub() {
        let { threadName, participantIDs, imageSrc } = await api.getThreadInfo(event.threadID);
        let userID = id.userFbId;
        var userMentions = await global.Users.get(userID)
        if (userID !== api.getCurrentUserID()) {
          var msg = `BONJOUR!, ${userMentions}\n┌────── ～●～ ──────┐\n----- Welcome to ${threadName} -----\n└────── ～●～ ──────┘\nYou're the ${participantIDs.length}th member of this group, please enjoy! 🥳♥`;
        };
        var image = await new knights.Welcome()
          .setUsername(`${userMentions}`)
          .setGuildName(`${threadName}`)
          .setGuildIcon(`${imageSrc}`)
          .setMemberCount(`${participantIDs.length}`)
          .setAvatar(`https://graph.facebook.com/${userID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
          .setBackground(`${_data}`)
          .toAttachment();
        var data = image.toBuffer();
        fs.writeFileSync(__dirname + "/../../commands/cache/welcome.jpg", data);
        return api.sendMessage({ body: msg, attachment: fs.createReadStream(__dirname + `/../../commands/cache/welcome.jpg`) }, event.threadID, () => fs.unlinkSync(__dirname + `/../../commands/cache/welcome.jpg`));
      }
      logsub()
    })
    );
  } else if (event.logMessageType == "log:unsubscribe") {
    {
      async function logunsub() {
        let { threadName, participantIDs, imageSrc } = await api.getThreadInfo(event.threadID);
        let userID = event.logMessageData.leftParticipantFbId;
        var userMentions = await global.Users.get(userID);
        if (userID !== api.getCurrentUserID()) {
          var msg = `Sayōnara ${userMentions}!\n${threadName} Will Miss You.`;
          var image = await new knights.Goodbye()
            .setUsername(`${userMentions}`)
            .setGuildName(`${threadName}`)
            .setGuildIcon(`${imageSrc}`)
            .setMemberCount(`${participantIDs.length}`)
            .setAvatar(`https://graph.facebook.com/${userID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
            .setBackground(`${_data}`)
            .toAttachment();
          var data = image.toBuffer();
          fs.writeFileSync(__dirname + "/../../commands/cache/bye.jpg", data);
          return api.sendMessage({ body: msg, attachment: fs.createReadStream(__dirname + `/../../commands/cache/bye.jpg`) }, event.threadID, () => fs.unlinkSync(__dirname + `/../../commands/cache/bye.jpg`))
        }
      }
      logunsub()
    }
  }
}

//CREDITS TO D-JUKIE
function isUrlValid(link) {
  var res = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if (res == null)
    return !1;
  else return !0
}

async function notif({ event, api }) {
  const botID = await api.getCurrentUserID();
  var gio = moment.tz("Asia/Manila").format("HH:mm:ss || MM/DD/YYYY");
  var formReport = `👾👾👾 BOT NOTIFICATION 👾👾👾\n\n» Thread ID: ${event.threadID}\n» Thread Name: {threadName}\n» Action: {task}\n» Action Created By UserID: ${event.author}\n» User Name: {userMentions}\n» ${gio} «`,
    task = "";
  if (event.logMessageType == "log:thread-name") {
    async function name() {
      const { threadName } = await api.getThreadInfo(event.threadID);
      var userMentions = await global.Users.get(event.author);
      const newName = event.logMessageData.name || "Name does not exist";
      task = "User Changes The Group Name To: '" + newName + "'";
      formReport = formReport
        .replace(/\{task}/g, task)
        .replace(/\{threadName}/g, threadName)
        .replace(/\{userMentions}/g, userMentions);
      return api.sendMessage(formReport, global.config.ADMIN[0], (error, info) => {
        if (error) return;
      });
    }
    name()
  } else if (event.logMessageType == "log:subscribe") {
    async function sub() {
      if (event.logMessageData.addedParticipants.some(i => i.userFbId === botID)) {
        var { threadName } = await api.getThreadInfo(event.threadID);
        var userMentions = await global.Users.get(event.author);
        task = "A User Added The Bot To A New Group!";
        formReport = formReport
          .replace(/\{task}/g, task)
          .replace(/\{threadName}/g, threadName)
          .replace(/\{userMentions}/g, userMentions);
        return api.sendMessage(formReport, global.config.ADMIN[0], (error, info) => {
          if (error) return;
        });
      } else return;
    }
    sub()
  } else if (event.logMessageType == "log:unsubscribe") {
    async function unsub() {
      if (event.logMessageData.leftParticipantFbId === botID) {
        var { threadName } = await api.getThreadInfo(event.threadID);
        var userMentions = await global.Users.get(event.author);
        task = "A User Kicked The Bot Out Of The Group!"
        formReport = formReport
          .replace(/\{task}/g, task)
          .replace(/\{threadName}/g, threadName)
          .replace(/\{userMentions}/g, userMentions);
        return api.sendMessage(formReport, global.config.ADMIN[0], (error, info) => {
          if (error) return;
        });
      } else return;
    }
    unsub()
  }
}

function prefix({ event, api }) {
  function pref() {
    var gio = moment.tz("Asia/Manila").format("HH:mm:ss || MM/DD/YYYY");
    api.setMessageReaction("😻", event.messageID, (err) => { }, true)
    return api.sendMessage(global.langText("settings", "prefix", global.PREFIX, gio), event.threadID, event.messageID)
  }
  if (event.body === global.PREFIX) return pref()
}

async function resend({ event, api }) {
  let { messageID, senderID, threadID } = event;
  let vip = global.config.ADMIN;
  if ((event.type === "message_unsend") && !vip.includes(senderID)) {
    try {
      const request = require("request");
      const fs = require("fs-extra");
      async function ress() {
        if (senderID == api.getCurrentUserID()) return;
        var getMsg = global.logMessages.get(messageID);
        if (!getMsg) return;
        var name = await global.Users.get(getMsg.sender);
        if (getMsg.attach && getMsg.msgBody) {
          var t = getMsg.type,
            type = t == "photo" ? "png" : t == "video" ? "mp4" : t == "audio" ? "mp3" : t == "sticker" ? "png" : "gif",
            callback = () => api.sendMessage({
              body: name + " Unsend This Attachment With The Message: " + getMsg.msgBody,
              attachment: fs.createReadStream(__dirname + "/../../commands/cache/uns." + type)
            }, event.threadID, () => fs.unlinkSync(__dirname + "/../../commands/cache/uns." + type));
          return request(getMsg.attach).pipe(fs.createWriteStream(__dirname + '/../../commands/cache/uns.' + type)).on('close', () => callback());
        } else if (getMsg.attach && !getMsg.msgBody) {
          var t = getMsg.type,
            type = t == "photo" ? "png" : t == "video" ? "mp4" : t == "audio" ? "mp3" : t == "sticker" ? "png" : "gif",
            callback = () => api.sendMessage({
              body: name + " Unsend This Attachment!",
              attachment: fs.createReadStream(__dirname + "/../../commands/cache/uns." + type)
            }, event.threadID, () => fs.unlinkSync(__dirname + "/../../commands/cache/uns." + type));
          return request(getMsg.attach).pipe(fs.createWriteStream(__dirname + '/../../commands/cache/uns.' + type)).on('close', () => callback());
        } else return api.sendMessage(`${name} Remove This Message: ${getMsg.msgBody}`, threadID)
      }
      ress()
    } catch (e) {
      global.chat(e)
    }
  }
}

function admin(uid) {
  var res = global.config.ADMIN.includes(uid)
  if (res == false)
    return !1;
  else return !0
}

function runCM({ event, api }) {
  const similar = require("string-similarity");
  const scanDir = require(`${__dirname}/../scanDir.js`);
  const path = require("path");
  var list = scanDir(".js", path.join(__dirname, "..", "..", "commands"));
  var cmdName = [], cmdPath = [];
  for (var i = 0; i < list.length; i++) {
    var _cmd = path.join(__dirname, "..", "..", "commands", list[i]);
    cmdName.push(require(_cmd).config.name);
    cmdPath.push(_cmd);
  }
  var cm = event.body.toLowerCase().slice(global.PREFIX.length, event.body.length);
  var ms = cm.split(" ");
  var ccm = false;
  var best = similar.findBestMatch(ms[0], cmdName);
  var bestIndex = best.bestMatchIndex;
  if (best.bestMatch.rating > 0.5) {
    try {
      var requireCM = require(cmdPath[bestIndex]);
      if (requireCM.config.perm === 1) {
        if (!admin(event.senderID)) return api.sendMessage(global.langText("settings", "adminOnly"), event.threadID, event.messageID)
      } else if (requireCM.config.perm === 2) {
        return api.sendMessage(global.langText("settings", "mainte"), event.threadID, event.messageID)
      } else if (requireCM.config.perm === 3) {
        if (event.senderID !== "100011316816555") return api.sendMessage("Only John Marky Can Use This Command!", event.threadID, event.messageID)
      }
      requireCM.start({ event, api });
    }
    catch (err) {
      console.error(err)
    }
    ccm = true
  }
  if (!ccm && (event.body !== global.PREFIX)) return api.sendMessage(global.langText("settings", "wrongCommand", global.PREFIX), event.threadID, event.messageID);
}

async function rankup({ event, api, uid, lvl }) {
  try {
    var name = await global.Users.get(uid);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    });
    const callback = () => api.sendMessage(
        { body: `${name}, Congrats on Leveling Up!\nYou're now Level ` + lvl, attachment: fs.createReadStream(__dirname + "/../../commands/cache/12.png"), mentions }, event.threadID, () => fs.unlinkSync(__dirname + "/../../commands/cache/12.png"));
    return request(encodeURI(`https://muichiro-api.onrender.com/rankupv2?uid=${uid}&api_key=muichiro`)).pipe(fs.createWriteStream(__dirname + '/../../commands/cache/12.png')).on('close', () => callback());
  } catch (err) {
    console.loaded(err)
  }
}

function isUid(data) {
  if (data.length > 14) return !0
  else return !1
}

function unicode(input, start, end) {
  try {
    const hexDigits = '0123456789ABCDEF'.split('');
    function toHexDigit(nibble) {
      return hexDigits[nibble & 15];
    }
    function parse(ch) {
      const code = ch.codePointAt(0);
      return toHexDigit((code >> 12) & 15) +
        toHexDigit((code >> 8) & 15) +
        toHexDigit((code >> 4) & 15) +
        toHexDigit(code & 15);
    }
    if (input == null) {
      return console.error("Unicode: Need An Input!");
    }
    start = start != null && start >= 0 ? start : 0;
    end = end != null && end >= 0 ? Math.min(end, input.length) : input.length;
    let result = '';
    for (let i = start; i < end; i++) {
      result += `\\u${parse(input[i])}`;
    }
    return result;
  } catch (e) {
    return global.chat(e)
  }
}
//////FUNCTIONS AND GLOBALS///////



//EXPORTS! global.events
module.exports = {
  cronss,
  inout,
  isUrlValid,
  notif,
  prefix,
  resend,
  runCM,
  rankup,
  admin,
  checkIfBot,
  adminTag,
  isUid,
  unicode
}