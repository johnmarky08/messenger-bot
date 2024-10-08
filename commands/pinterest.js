module.exports.config = {
  name: "pinterest",
  des: "Search On Pinterest",
  nodeDepends: {},
  author: "Joshua Sy",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  var keySearch = global.msg;
  
  if (!keySearch.includes("-")) return api.sendMessage(`Please enter in the format, example: ${global.PREFIX}pinterest Naruto - 10 (it depends on you how many images you want to appear in the result)`, event.threadID, event.messageID);
  
  var keySearchs = keySearch.substr(0, keySearch.indexOf('-'));
  const numberSearch = keySearch.split("-").pop();
  const res = await axios.get(`https://muichiro-api.onrender.com/pinterest?search=${encodeURIComponent(keySearchs)}&api_key=muichiro`);
  
  if ((parseInt(numberSearch) > res.data.count) || (parseInt(numberSearch) > 50)) return api.sendMessage(`Cannot Search More Than ${(parseInt(numberSearch) > res.data.count ? res.data.count : 50)} Pictures Of ${keySearchs}!`, event.threadID, event.messageID);
  
  const data = res.data.data;
  var num = 0;
  var imgData = [];
  for (var i = 0; i < parseInt(numberSearch); i++) {
    let path = __dirname + `/cache/${num += 1}.jpg`;
    let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
    imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));
  }
  api.sendMessage({
    attachment: imgData,
    body: numberSearch + ' Search results for keyword: ' + keySearchs
  }, event.threadID, event.messageID)
  for (let ii = 1; ii < parseInt(numberSearch); ii++) {
    fs.unlinkSync(__dirname + `/cache/${ii}.jpg`)
  }
}