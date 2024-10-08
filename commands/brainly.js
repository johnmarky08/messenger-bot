module.exports.config = {
  name: "brainly",
  des: "Brainly V2",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  var msg = global.msg;
  if (!msg) {
    return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID)
  } else {
    const { Brainly } = require("brainly-scraper-v2");
    Brainly.initialize();
    const brain = new Brainly("ph");
    brain
      .search(msg, "ph")
      .then(res => {
        var num = Math.floor(Math.random() * res.length);
        return api.sendMessage(res[num].answers[Math.floor(Math.random() * res[num].answers.length)].content.replace(/(<([^>]+)>)/gi, ""), event.threadID, event.messageID)
      })
      .catch(e => console.error(JSON.stringify(e)));
  }
}