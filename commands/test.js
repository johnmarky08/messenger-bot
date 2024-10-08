module.exports.config = {
  name: "test",
  des: "...",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 3
};

module.exports.start = async function({ event, api }) {
  try {
    var a = await api.getUserInfo(event.senderID);
    global.chat(((parseInt(global.msg) % 50) == 0).toString())
    return global.chat(JSON.stringify(a, null, 2))
  } catch (e) {
    return global.chat(e)
  }
}