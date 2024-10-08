module.exports.config = {
  name: "pair2",
  des: "Pairing",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

async function makeImage({ one, two }) {
  const fs = require("fs-extra");
  const path = require("path");
  const axios = require("axios");
  const jimp = require("jimp");
  const __root = path.resolve(__dirname, "cache");

  let pairing_img = await jimp.read(__dirname + "/assets/pair.jpg");
  let pathImg = __root + `/pairing_${one}_${two}.png`;
  let avatarOne = __root + `/avt_${one}.png`;
  let avatarTwo = __root + `/avt_${two}.png`;

  let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

  let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

  let circleOne = await jimp.read(await circle(avatarOne));
  let circleTwo = await jimp.read(await circle(avatarTwo));
  pairing_img.composite(circleOne.resize(85, 85), 355, 100).composite(circleTwo.resize(75, 75), 250, 140);

  let raw = await pairing_img.getBufferAsync("image/png");

  fs.writeFileSync(pathImg, raw);
  fs.unlinkSync(avatarOne);
  fs.unlinkSync(avatarTwo);

  return pathImg;
}
async function circle(image) {
  const jimp = require("jimp");
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}

module.exports.start = async function({ event, api }) {
  try {
    const fs = require("fs-extra");
    const botID = await api.getCurrentUserID();
    const { threadID, messageID, senderID } = event;
    var tle = Math.floor(Math.random() * 101);
    var namee = await global.Users.get(event.senderID);
    let { participantIDs } = await api.getThreadInfo(event.threadID);
    var emoji = await participantIDs.filter(ID => ID != botID && ID != event.senderID);
    var id = emoji[Math.floor(Math.random() * emoji.length)];
    var name = await global.Users.get(id);
    var arraytag = [];
    arraytag.push({ id: event.senderID, tag: namee });
    arraytag.push({ id: id, tag: name });
    var one = senderID, two = id;
    makeImage({ one, two }).then(p => {
      return api.sendMessage({ body: `Congratulations ${namee} was paired with ${name}\nPair odds are: ${tle}%`, attachment: fs.createReadStream(p), mentions: arraytag }, threadID, () => fs.unlinkSync(p), messageID);
    })
  } catch (e) {
    return global.chat(e)
  }
}