module.exports = function({ event, api }) {
  const emoji = [
    {
      keys: ["heart", "puso", "valentines", "pagibig", "love", "hug", "kiss", "marry", "valentines"],
      emote: "❤️"
    },
    {
      keys: ["haha", "lol", "lmao", "pangit", "ayoko"],
      emote: "😆"
    },
    {
      keys: ["sad", "cry", "sadness", "awts", "ouch"],
      emote: "🥺"
    },
    {
      keys: ["oa", "piste", "stop"],
      emote: "😭"
    },
    {
      keys: ["hmm", "..."],
      emote: "🤔"
    },
    {
      keys: ["bruh", "beh", "ngek", "sana all", "sna ol", "china oil"],
      emote: "😀"
    },
    {
      keys: ["cute", "clown", "bye"],
      emote: "🤡"
    },
    {
      keys: ["69", "baligtaran", "bastos", "style", "position"],
      emote: "😶"
    },
    {
      keys: ["iww", "kadiri", "yuck"],
      emote: "🤮"
    },
    {
      keys: ["sakit", "sipon", "ayaw", "sama"],
      emote: "🤧"
    },
    {
      keys: ["bday", "xmas", "party"],
      emote: "🥳"
    },
    {
      keys: ["dead", "patay", "lagot"],
      emote: "💀"
    },
    {
      keys: ["kanta", "song"],
      emote: "🎶"
    },
    {
      keys: ["bad", "evil"],
      emote: "😈"
    },
    {
      keys: ["eyy", "cool", "wew"],
      emote: "😎"
    },
    {
      keys: ["luh", "wow", "shock", "wtf"],
      emote: "😱"
    }
  ];
  emoji.forEach((eme) => {
    eme.keys.forEach((key) => {
      if (event.body.toLowerCase().includes(key)) {
        api.setMessageReaction(eme.emote, event.messageID, (err) => { }, true)
      }
    })
  })
}