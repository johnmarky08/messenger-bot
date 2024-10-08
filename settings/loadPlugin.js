const fs = require('fs');
const path = require("path");
const childProcess = require('child_process');

function scanDir(type, link) {
  var dirfile = fs.readdirSync(link);
  var arr = [];
  for (var i = 0; i < dirfile.length; i++) {
    if (dirfile[i].lastIndexOf(type) == dirfile[i].length - type.length) {
      if (fs.lstatSync(path.join(link, dirfile[i])).isFile()) {
        arr.push(dirfile[i]);
      }
    }
  }
  return arr;
}

function loadfunc() {
  !global.plugins ? global.plugins = {} : "";
  !global.plugins.command ? global.plugins.command = {} : "";
  !global.plugins.lang ? global.plugins.lang = {} : "";
  !global.noPrefix ? global.noPrefix = {} : "";
  var list = scanDir(".js", path.join(__dirname, "..", "commands"));
  var lisst = scanDir(".js", path.join(__dirname, "..", "noPrefix"));
  var listFile = [];
  var listlist = [];
  for (var i = 0; i < list.length; i++) {
    var check = path.join(__dirname, "..", "commands", list[i]);
    if (!fs.lstatSync(check).isDirectory()) {
      listFile.push(list[i]);
    }
  }
  for (var i = 0; i < lisst.length; i++) {
    var check = path.join(__dirname, "..", "noPrefix", lisst[i]);
    if (!fs.lstatSync(check).isDirectory()) {
      listlist.push(lisst[i]);
    }
  }
  var check = false;
  for (var i = 0; i < listFile.length; i++) {
    try {
      var pluginInfo = require(path.join(__dirname, "..", "commands", listFile[i])).config;
      var t = loadpackage(listFile[i], pluginInfo);
      if (t != undefined) {
        check = true;
      }
    }
    catch (err) { }
  }
  for (var i = 0; i < listFile.length; i++) {
    try {
      var pluginInfo = require(path.join(__dirname, "..", "commands", listFile[i])).config;
      var t = loadpackage(listFile[i], pluginInfo);
      if (t != undefined) {
        check = true;
      }
    }
    catch (err) { }
  }

  for (var i = 0; i < listFile.length; i++) {
    try {
      var pluginInfo = require(path.join(__dirname, "..", "commands", listFile[i])).config;
      load(listFile[i], pluginInfo);
    }
    catch (err) {
      console.error("Unable To Load \"" + listFile[i] + "\" With Error: " + err)
    }
  }
  for (var i = 0; i < listlist.length; i++) {
    try {
      var pluginInfo = require(path.join(__dirname, "..", "noPrefix", listlist[i])).config;
      noPrefixx(listlist[i], pluginInfo);
    }
    catch (err) {
      console.error("Unable To Load \"" + listlist[i] + "\" With Error: " + err)
    }
  }
}
function noPrefixx(file, pluginInfo) {
  !global.noPrefix[pluginInfo.name] ? global.noPrefix[pluginInfo.name] = {
    dir: path.join(__dirname, "..", "noPrefix", file),
    keys: pluginInfo.keys
  } : "";
  console.cmdLoaded("Loaded No Prefix " + pluginInfo.name + " Command → Version: " + pluginInfo.version)
}
function load(file, pluginInfo) {
  !global.plugins.command[pluginInfo.name] ? global.plugins.command[pluginInfo.name] = {
    name: pluginInfo.name,
    des: pluginInfo.des,
    author: pluginInfo.author,
    dir: path.join(__dirname, "..", "commands", file),
    version: pluginInfo.version
  } : "";
  for (var i in pluginInfo.langMap) {
    !global.plugins.lang[i] ? global.plugins.lang[i] = pluginInfo.langMap[i] : "";
  }
  console.cmdLoaded("Command " + pluginInfo.name + " Successfully Loaded → Version: " + pluginInfo.version)
}

//Load Package For Command
function loadpackage(file, pluginInfo) {
  if (typeof pluginInfo.nodeDepends == "object") {
    for (var i in pluginInfo.nodeDepends) {
      if (!fs.existsSync(path.join(__dirname, "..", "node_modules", i, "package.json"))) {

        console.logg("install modules \"" + i + "\" commands \"" + pluginInfo.name + "\":\n");
        if (pluginInfo.nodeDepends[i] != "") {
          childProcess.execSync(`npm install ${i}@${pluginInfo.nodeDepends[i]}`, {
            stdio: "inherit"
          })
        }
        else {
          childProcess.execSync(`npm install ${i}`, {
            stdio: "inherit"
          })
        }
        return true;
      }
    }
  }
}

module.exports = loadfunc;