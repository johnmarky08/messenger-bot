module.exports = async function({ event, api }) {
  try {
    const __file = global.events,
      inout = __file.inout,
      notif = __file.notif,
      resend = __file.resend,
      prefix = __file.prefix,
      runCM = __file.runCM,
      user_ = require(__dirname + "/../events/Users.js"),
      check = await global.events.checkIfBot(event.senderID),
      _console = require("./console");
    if (!check) return;
    switch (event.type) {
      case "log:subscribe":
      case "message_reply":
      case "message":
        ///////////////GLOBAL TEXT//////////////
        var aridaaaa = event.body.slice(global.config.PREFIX.length).trim().split(/ +/);
        global.msg = aridaaaa.slice(1).join(" ");
        global.userName = async function(__data) {
          return (await api.getUserInfo(__data))[__data].name;
        }
        ////////////////////////////////////////
        try {
          global.logMessages.set(event.messageID, {
            msgBody: event.body || null,
            attach: event.attachments[0].url,
            type: event.attachments[0].type,
            sender: event.senderID
          })
        } catch {
          global.logMessages.set(event.messageID, {
            msgBody: event.body,
            sender: event.senderID
          })
        }

        global.chat = function(data) {
          api.sendMessage(data, event.threadID, event.messageID)
        }

        //api.markAsReadAll(() => { });
        user_.register({ event, api });
        global.rank.rank({ event, api });
        global.events.adminTag({ event, api });
        require(__dirname + "/../events/emoticons.js")({ event, api });
        _console({ event, api });
        break;
      case "event":
        break;
      default:
        if (global.config.logEvent == true) console.logg(JSON.stringify(event, null, 2));
    }
    inout({ event, api })
    notif({ event, api })
    resend({ event, api })
    prefix({ event, api })
    for (var name in global.noPrefix) {
      var funcfunc = global.noPrefix[name].keys;
      try {
        funcfunc.forEach(key => {
          if (event.body.toLowerCase().match(key) && !event.body.startsWith(global.config.PREFIX) && (global.config.noPrefix == true)) {
            nonPrefix({ event, api, name });
          }
        })
      } catch (err) { }
    }
    if (event.body != undefined && event.body.slice(0, global.config.PREFIX.length) == global.config.PREFIX) {
      runCM({ event, api });
    }
    function nonPrefix({ event, api, name }) {
      try {
        var requireCM = require(global.noPrefix[name].dir);
        requireCM.start({ event, api });
      }
      catch (err) {
        console.error(JSON.stringify(err));
      }
    }
  } catch (e) {
    console.error(JSON.stringify(e))
  }
}