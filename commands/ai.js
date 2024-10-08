module.exports.config = {
  name: "ai",
  des: "Open AI",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const msg = global.msg;
  if (!msg)
    return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID);
  api.sendMessage("Searching... 🔎", event.threadID, event.messageID);
  try {
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: global.config.openai,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: msg,
      temperature: 0.9,
      max_tokens: 1450,
    });
    var data = completion.data.choices[0].text;
    return api.sendMessage(data, event.threadID, event.messageID);
  } catch (e) {
    return api.sendMessage(global.langText("commands", "err", e), event.threadID, event.messageID)
  }
}