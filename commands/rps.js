module.exports.config = {
  name: "rps",
  des: "Rock Paper Scissors Shoot",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  try {
    const msg = encodeURI(global.msg.split(" ")[0]).toLowerCase();
    if (!msg) return global.chat(global.langText("commands", "noText"))
    var reply = ["\u270C\uFE0F\u0020\u0028\u0053\u0063\u0069\u0073\u0073\u006F\u0072\u0073\u0029", "\u270A\u0020\u0028\u0052\u006F\u0063\u006B\u0029", "\uD83D\uDD90\uFE0F\u0020\u0028\u0050\u0061\u0070\u0065\u0072\u0029"];
    var a = reply[Math.floor(Math.random() * reply.length)];
    let name = await global.Users.get(event.senderID);
    if (name === "Facebook User") name = "You";
    var rock = ["%e2%9c%8a", "rocks", "rock"];
    var sci = ["%e2%9c%8c%ef%b8%8f", "scissor", "scissors"];
    var paper = ["%f0%9f%96%90%ef%b8%8f", "papers", "paper"];
    var bot = global.config.BOTNAME;
    var r = "\u270A\u0020\u0028\u0052\u006F\u0063\u006B\u0029",
      p = "\uD83D\uDD90\uFE0F\u0020\u0028\u0050\u0061\u0070\u0065\u0072\u0029",
      s = "\u270C\uFE0F\u0020\u0028\u0053\u0063\u0069\u0073\u0073\u006F\u0072\u0073\u0029";
    var text = rock.includes(msg) ? "\u270A\u0020\u0028\u0052\u006F\u0063\u006B\u0029" : sci.includes(msg) ? "\u270C\uFE0F\u0020\u0028\u0053\u0063\u0069\u0073\u0073\u006F\u0072\u0073\u0029" : paper.includes(msg) ? "\uD83D\uDD90\uFE0F\u0020\u0028\u0050\u0061\u0070\u0065\u0072\u0029" : "Error";
    if (text === "Error") return global.chat("Choose Only Between Rock, Paper Or Scissors");
    let win = "";
    if (text === r && a === p) win = bot + " Wins!"
    else if (text === p && a === r) win = name + " Wins!"
    else if (text === r && a === s) win = name + " Wins!"
    else if (text === s && a === r) win = bot + " Wins!"
    else if (text === s && a === p) win = name + " Wins!"
    else if (text === p && a === s) win = bot + " Wins!"
    else win = "Its A Tie!"
    global.chat(name + ": " + text + "\n\n" + global.config.BOTNAME + ": " + a + "\n\n" + win)
  } catch (e) {
    return api.sendMessage("Something Went Wrong...\n\n" + e, event.threadID, event.messageID)
  }
}