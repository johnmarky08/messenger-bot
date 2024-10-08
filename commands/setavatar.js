module.exports.config = {
  name: "setavatar",
  des: "Change Bot's Avatar Profile",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  const axios = require("axios");
  const reply = global.chat;
  const body = global.msg;
  const botID = await api.getCurrentUserID();
  let imgUrl;
  if (body && body.match(/^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g)) imgUrl = body;
  else if (event.messageReply.attachments[0] && event.messageReply.attachments[0].type == "photo") imgUrl = event.messageReply.attachments[0].url;
  else return reply(`Please enter a valid image link or reply to the message with an image you want to set as an avatar for the bot`);
  try {
    const imgBuffer = (await axios.get(imgUrl, {
      responseType: "stream"
    })).data;
    const form0 = {
      file: imgBuffer
    };
    let uploadImageToFb = await api.httpPostFormData(`https://www.facebook.com/profile/picture/upload/?profile_id=${botID}&photo_source=57&av=${botID}`, form0);
    uploadImageToFb = JSON.parse(uploadImageToFb.split("for (;;);")[1]);
    if (uploadImageToFb.error) return reply("Error! An error occurred. Please try again later: " + uploadImageToFb.error.errorDescription);
    const idPhoto = uploadImageToFb.payload.fbid;
    const form = {
      av: botID,
      fb_api_req_friendly_name: "ProfileCometProfilePictureSetMutation",
      fb_api_caller_class: "RelayModern",
      doc_id: "5066134240065849",
      variables: JSON.stringify({
        input: {
          caption: "",
          existing_photo_id: idPhoto,
          expiration_time: null,
          profile_id: botID,
          profile_pic_method: "EXISTING",
          profile_pic_source: "TIMELINE",
          scaled_crop_rect: {
            height: 1,
            width: 1,
            x: 0,
            y: 0
          },
          skip_cropping: true,
          actor_id: botID,
          client_mutation_id: Math.round(Math.random() * 19).toString()
        },
        isPage: false,
        isProfile: true,
        scale: 3
      })
    };
    api.httpPost("https://www.facebook.com/api/graphql/", form, (e, i) => {
      if (e) reply(`An error occurred, please try again later: ` + e);
      else if (JSON.parse(i.slice(0, i.indexOf('\n') + 1)).errors) reply(`Error! An error occurred. Please try again later: ${JSON.parse(i).errors[0].description}`);
      else reply(`Changed The Bot's Profile Avatar Successfully!`);
    });
  }
  catch (err) {
    reply(`An error occurred, please try again later: ` + err);
  }
}