module.exports.config = {
  name: "guard",
  des: "Turn The Bot's Guard On or Off",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  const args = global.msg.split(" "),
    botID = await api.getCurrentUserID();
  if (!args[0] || !["on", "off"].includes(args[0])) return api.sendMessage(`Please Select "On" or "Off"`, event.threadID, event.messageID);
  const form = {
    av: botID,
    variables: JSON.stringify({
      "0": {
        is_shielded: args[0] == 'on' ? true : false,
        actor_id: botID,
        client_mutation_id: Math.round(Math.random() * 19)
      }
    }),
    doc_id: "1477043292367183"
  };
  api.httpPost("https://www.facebook.com/api/graphql/", form, (err, data) => {
    if (err || JSON.parse(data).errors) api.sendMessage("An error occurred, please try again later\n\nError: " + err, event.threadID, event.messageID);
    else api.sendMessage(`» Bot's Guard Shield Has Been Successfully  ${args[0] == 'on' ? 'Turned On' : 'Turned Off'}`, event.threadID, event.messageID);
  });
}