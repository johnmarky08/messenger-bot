const fs = require("fs");
//const login = require("fb-tanjiro-main");
const login = require("fca-unofficial");
const path = require("path");
const chalk = require('chalk');
const listen = require(`${__dirname}/listen.js`);
const cronss = global.events.cronss;
const moment = require("moment-timezone");
var gio = moment.tz("Asia/Manila").format("HH:mm:ss || MM/DD/YYYY");

async function load({ api }) {
  cronss({ api })
  console.loaded("Bot ID: " + api.getCurrentUserID());
  var files = fs.readdirSync('./commands/');
  console.logg(`Successfully Loaded: ${files.length} Commands`);
  console.logg("Successfully Connected On Muichiro Senpai's Server\n");
  console.log(chalk.bold.hex("#B0FEFF").bold("███╗░░░███╗██╗░░░██╗██╗░█████╗░██╗░░██╗██╗██████╗░░█████╗░\n████╗░████║██║░░░██║██║██╔══██╗██║░░██║██║██╔══██╗██╔══██╗\n██╔████╔██║██║░░░██║██║██║░░╚═╝███████║██║██████╔╝██║░░██║\n██║╚██╔╝██║██║░░░██║██║██║░░██╗██╔══██║██║██╔══██╗██║░░██║\n██║░╚═╝░██║╚██████╔╝██║╚█████╔╝██║░░██║██║██║░░██║╚█████╔╝"));
  api.sendMessage(global.config.BOTNAME + " Bot Has Been Activated Successfully!", 100011316816555);
  console.logg("Please Don't Steal My System\n\n» PHILIPPINES TIME AND DATE «\n" + gio);
  
  api.listenMqtt((err, event) => {
    if (err) return console.error(err);

    api.setOptions({
      forceLogin: true,
      listenEvents: true,
      selfListen: global.config.seflListen
    });
    listen({ event, api })
  })
}
function loginn() {
  var json = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "../fbstate.json"), 'utf8'));
  if (json.url && json.cookies) {
    console.logg("Found State File!")
    let appstate = [];
    for (const i of json.cookies) {
      appstate.push({
        key: i.name,
        value: i.value,
        expires: i.expirationDate || "",
        domain: i.domain.replace(".", ""),
        path: i.path
      })
    }
    require("npmlog").emitLog = () => { };
    return login({ appState: JSON.parse(appstate) }, (err, api) => {
      if (err) {
        return process.exit()
      }
      console.logg('Bot Connected');
      return load({ api })
    })
  } else {
    console.logg("Found State File")
    require("npmlog").emitLog = () => { };
    return login({ appState: JSON.parse(JSON.stringify(json)) }, (err, api) => {
      if (err) {
        return process.exit()
      }
      console.logg('Bot Connected');
      return load({ api })
    })
  }
}
module.exports = loginn;