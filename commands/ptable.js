module.exports.config = {
  name: "ptable",
  des: "Periodic Table Of Elements",
  nodeDepends:{},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function ({ event, api }){
  const axios = require('axios');
  const request = require("request");
  const fs = require("fs-extra");
  var john = global.msg;
  if (!john) return api.sendMessage(`Add An Element First!`, event.threadID, event.messageID);
  res = await axios.get(`https://api.popcat.xyz/periodic-table?element=${john}`).then(res => {
    var name = res.data.name;
    var symbol = res.data.symbol;
    var atomicnum = res.data.atomic_number;
    var atomicmass = res.data.atomic_mass;
    var period = res.data.period;
    var phase = res.data.phase;
    var disco = res.data.discovered_by;
    var summary = res.data.summary;
    let callback = function () {
      api.sendMessage({
        body: `╔══ ≪ °❈° ≫ ══╗\nPeriodic Table Of ${name}\n╚══ ≪ °❈° ≫ ══╝\n\n» Name: ${name}\n» Symbol: ${symbol}\n» Atomic Number: ${atomicnum}\n» Atomic Mass: ${atomicmass}\n» Period: ${period}\n» Phase: ${phase}\n» Discovered By: ${disco}\n\n✎ Summary:\n「 ${summary} 」`,
        attachment: fs.createReadStream(__dirname + `/cache/elementp.png`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/elementp.png`), event.messageID);
    };
    request(res.data.image).pipe(fs.createWriteStream(__dirname + `/cache/elementp.png`)).on("close", callback);
  })
}