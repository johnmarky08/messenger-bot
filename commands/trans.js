module.exports.config = {
  name: "trans",
  des: "Translate Any Text To English",
  nodeDepends:{},
  author: "Unknown",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function ({ event, api }){
  var content = global.msg;
  if (!content && event.type != "message_reply") return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID);
  const request = require("request");
  var translateThis = content.slice(0, content.indexOf(" => "));
	var lang = content.substring(content.indexOf(" => ") + 4);
	if (event.type == "message_reply") {
		translateThis = event.messageReply.body
		if (content.indexOf(" => ") !== -1) lang = content.substring(content.indexOf(" => ") + 3);
		else lang = global.config.language;
	}
	else if (content.indexOf(" => ") == -1) {
		translateThis = content.slice(0, content.length)
		lang = global.config.language;
	}
	return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, response, body) => {
		if (err) return api.sendMessage("An error has occurred!", event.threadID, event.messageID);
		var retrieve = JSON.parse(body);
		var text = '';
		retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
		var fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0]
		api.sendMessage(`Translation:\n\n${text}\n\n- Translated From ${fromLang} To ${lang}`, event.threadID, event.messageID);
	});
}