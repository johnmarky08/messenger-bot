const log = require("./settings/log.js");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const boxen = require("boxen");

////////////GLOBALS////////////
global.package = require("./package.json");
global.config = require(`${process.cwd()}/config.json`);
global.logMessages = new Map();
global.Users = require(__dirname + "/settings/events/Users.js");
global.rank = require(__dirname + "/settings/events/rank.js");
global.PREFIX = global.config.PREFIX;
global.events = require(__dirname + "/settings/events/index.js");
////////////////////////////////

console.loaded = log.loaded;
console.logg = log.log;
console.error = log.err;
console.gban = log.gban;
console.cmdLoaded = log.cmdloaded;
console.message = log.message;

require("./settings/loadPlugin.js")();


const loginFB = require("./settings/controls/main.js");
const modules = {
  loginwithappstate: loginFB,
  loadData: function() {
    if (data.hasOwnProperty('threads')) {
      for (const thread of data.threads) {
        if (threadData.hasOwnProperty(thread.threadID)) {
          threadData[thread.threadID] = thread;
        }
      }
    }
    if (data.hasOwnProperty('users')) {
      for (const user of data.users) {
        if (userData.hasOwnProperty(user.userID)) {
          userData[user.userID] = user;
        }
      }
    }
  },
  getData: function({ event }) {
    var thread = data.threads.find(e => e.threadID == event.threadID);
    var user = data.users.find(e => e.userID == event.senderID);
    return {
      thread,
      user
    }
  }
}
modules.loginwithappstate();

console.logg("Version: " + package.version + " ");
console.logg(boxen('John Marky Natividad (Muichiro)\nwww.facebook.com/johnmarky.natividad', { padding: 1, margin: 1, borderStyle: 'double', title: 'SOURCE CODE', titleAlignment: 'center', align: 'center' }));

app.get('/', function(req, res) {
  res.redirect("https://muichiro-api.onrender.com/");
});

app.listen(port, function(err) {
  if (err) {
    console.error('Failure To Launch Server');
    return;
  }
  console.logg(`Listening On Port: ${port}`);
});

/////////////////MONITOR///////////
const Monitor = require('ping-monitor');
const monitor = new Monitor({
  address: '127.0.0.1',
  port: port,
  interval: 5,
  config: {
    intervalUnits: 'minutes'
  },
  httpOptions: {
    path: '/users',
    method: 'post',
    query: {
      first_name: 'Muichiro',
      last_name: 'Senpai'
    },
    body: 'Messenger Bot!'
  },
  expect: {
    statusCode: 200
  }
});

monitor.on('up', (res) => console.loaded(`${res.address}:${res.port} IS ONLINE!!`));
monitor.on('down', (res) => console.logg(`${res.address} ${res.statusMessage}`));
monitor.on('stop', (website) => console.logg(`${website}`));
monitor.on('error', (error) => console.logg(error));
monitor.on('up', (res) => console.loaded(`CREDITS TO "JOHN MARKY NATIVIDAD" - Source Code`));
///////////////////////////////////