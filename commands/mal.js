module.exports.config = {
  name: "mal",
  des: "Anime Info From MyAnimeList.net",
  nodeDepends: {},
  author: "John Arida",
  version: "1.0.0",
  perm: 0
};

module.exports.start = async function({ event, api }) {
  const malScraper = require('mal-scraper');
  try {
    var a = await malScraper.getInfoFromName(global.msg);
    const request = require("request"),
      fs = require("fs-extra");
    let cha = "";
    for (var i = 0; i < a.characters.length; i++) {
      cha += `• ${a.characters[i].name} [${a.characters[i].role}]\n`
    }
    if (a.studios.length === 1) stu = a.studios[0];
    if (a.genres.length === 1) gen = a.genres[0];
    var callback = () => api.sendMessage({ body: `Title: ${a.title}\nJapanese Title: ${a.japaneseTitle}\nEnglish Title: ${a.englishTitle}\n\nSynopsis: ${a.synopsis}\nEpisodes: ${a.episodes} - ${a.type}\nAir Time: ${a.aired} (Every ${a.broadcast})\nSource: ${a.source}\nDuration: ${a.duration}\nRatings: ${a.rating}\nStatus: ${a.status}\nScore: ${a.score} (${a.scoreStats})\nRank: ${a.ranked}\nPopularity: ${a.popularity}\nStudio/s: ${a.studios.join(", ")}\nGenres: ${a.genres.join(", ")}\nProducers: ${a.producers.join(", ")}\n\nCharacters:\n${cha}`, attachment: fs.createReadStream(__dirname + "/cache/anime.jpg") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/anime.jpg"));
    return request(a.picture).pipe(fs.createWriteStream(__dirname + '/cache/anime.jpg')).on('close', () => callback());
  } catch {
    return api.sendMessage(global.langText("commands", "noText"), event.threadID, event.messageID)
  }
}