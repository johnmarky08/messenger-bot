module.exports.config = {
  name: "owner",
  des: "The Owner Of The Bot",
  nodeDepends:{},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function ({ event, api }){
  const request = require("request");
  const fs = require("fs-extra");
  var callback = () => api.sendMessage(
    {body:`» Owner of ${global.config.BOTNAME} Bot «\n➟ John Marky Natividad\n❂ Admin UID: 100011316816555\n♛ Admin FB Link:\nhttps://www.facebook.com/johnmarky.natividad`, attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));  
      return request(encodeURI(`https://graph.facebook.com/100011316816555/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
}