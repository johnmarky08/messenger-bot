module.exports.config = {
  name: "outall",
  des: "Out The Bot To All Gc's",
  nodeDepends:{},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function ({ event, api }){
  var id = await api.getCurrentUserID();
  return api.getThreadList(100, null, ["INBOX"], (err, list) => {
		if (err) throw err;
		list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.removeUserFromGroup(id, item.threadID) : '');
		api.sendMessage('The Bot Is Successfully Outed All Threads!', event.threadID);
	});
}