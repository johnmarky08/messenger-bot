module.exports.config = {
  name: "listbox",
  des: "List Of All Threads That The Bot Is Joined",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  var inbox = await api.getThreadList(100, null, ['INBOX']);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

  var listthread = [];

  //////////


  for (var groupInfo of list) {
    //const botID = api.getCurrentUserID();

    listthread.push({
      id: groupInfo.threadID,
      name: groupInfo.name,
      sotv: groupInfo.participantIDs.length
    });

  } //for

  var listbox = listthread.sort((a, b) => {
    if (a.sotv > b.sotv) return -1;
    if (a.sotv < b.sotv) return 1;
  });

  let msg = '',
    i = 1;
  var groupid = [];
  for (var group of listbox) {
    msg += `${i++}. Name: ${group.name}\n   TID: ${group.id}\n   Members: ${group.sotv}\n\n`;
    groupid.push(group.id);
  }

  api.sendMessage("📝 LIST OF THREADS 📝\n\n" + msg, event.threadID);
}