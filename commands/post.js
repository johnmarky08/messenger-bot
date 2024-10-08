module.exports.config = {
  name: "post",
  des: "Post",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  const body = global.msg.split(" ");
  if (!body) return global.chat("Wrong Format! " + global.PREFIX + "post [privacy] [content]")
  const { threadID, messageID, senderID } = event;
  const uuid = getGUID();
  const formData = {
    "input": {
      "composer_entry_point": "inline_composer",
      "composer_source_surface": "timeline",
      "idempotence_token": uuid + "_FEED",
      "source": "WWW",
      "attachments": [],
      "audience": {
        "privacy": {
          "allow": [],
          "base_state": "FRIENDS", // SELF EVERYONE
          "deny": [],
          "tag_expansion_state": "UNSPECIFIED"
        }
      },
      "message": {
        "ranges": [],
        "text": ""
      },
      "with_tags_ids": [],
      "inline_activities": [],
      "explicit_place_id": "0",
      "text_format_preset_id": "0",
      "logging": {
        "composer_session_id": uuid
      },
      "tracking": [
        null
      ],
      "actor_id": await api.getCurrentUserID(),
      "client_mutation_id": Math.floor(Math.random() * 17)
    },
    "displayCommentsFeedbackContext": null,
    "displayCommentsContextEnableComment": null,
    "displayCommentsContextIsAdPreview": null,
    "displayCommentsContextIsAggregatedShare": null,
    "displayCommentsContextIsStorySet": null,
    "feedLocation": "TIMELINE",
    "feedbackSource": 0,
    "focusCommentID": null,
    "gridMediaWidth": 230,
    "groupID": null,
    "scale": 3,
    "privacySelectorRenderLocation": "COMET_STREAM",
    "renderLocation": "timeline",
    "useDefaultActor": false,
    "inviteShortLinkKey": null,
    "isFeed": false,
    "isFundraiser": false,
    "isFunFactPost": false,
    "isGroup": false,
    "isTimeline": true,
    "isSocialLearning": false,
    "isPageNewsFeed": false,
    "isProfileReviews": false,
    "isWorkSharedDraft": false,
    "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute",
    "hashtag": null,
    "canUserManageOffers": false
  };
  const axios = require("axios");
  const fs = require("fs-extra");
  const botID = await api.getCurrentUserID();
  async function uploadAttachments(attachments) {
    let uploads = [];
    for (const attachment of attachments) {
      const form = {
        file: attachment
      };
      uploads.push(api.httpPostFormData(`https://www.facebook.com/profile/picture/upload/?profile_id=${botID}&photo_source=57&av=${botID}`, form));
    }
    uploads = await Promise.all(uploads);
    return uploads;
  }

  if (!["1", "2", "3"].includes(body[0])) return api.sendMessage('Please choose 1, 2 or 3 as Privacy', threadID, messageID);
  formData.input.audience.privacy.base_state = body[0] == 1 ? "EVERYONE" : body[0] == 2 ? "FRIENDS" : "SELF";
  formData.input.message.text = body.slice(1).join(" ");
  if (event.messageReply) {
    const attachments = event.messageReply.attachments;
    const allStreamFile = [];
    const pathImage = __dirname + `/cache/imagePost.png`;
    for (const attach of attachments) {
      if (attach.type != "photo") continue;
      const getFile = (await axios.get(attach.url, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(pathImage, Buffer.from(getFile));
      allStreamFile.push(fs.createReadStream(pathImage));
    }
    const uploadFiles = await uploadAttachments(allStreamFile);
    for (let result of uploadFiles) {
      if (typeof result == "string") result = JSON.parse(result.replace("for (;;);", ""));
      formData.input.attachments.push({
        "photo": {
          "id": result.payload.fbid.toString(),
        }
      });
    }
    /*
    for (const path of paths) {
      try {
        fs.unlinkSync(path);
      }
      catch(e) {}
    }
    */
  }
  /*
  api.unsendMessage(handleReply.messageID, () => {
    api.sendMessage(`Bắt đầu tạo bài viết....`, threadID, (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        formData,
        type: "video"
      });
    }, messageID);
  });
}
else if (type == "video") {
   
  if (event.body != "0") {
    if (!handleReply.uploadVideos) handleReply.uploadVideos = [];
    const { uploadVideos } = handleReply;
    if (attachments[0].type != "video") return;
    const getFile = (await axios.get(attachments[0].url, { responseType: "arraybuffer" })).data;
    const pathVideo = __dirname + "/cache/videoPost.mp4";
    fs.writeFileSync(pathVideo, Buffer.from(getFile));
    uploadVideos.push(fs.createReadStream(pathVideo));
    
    return api.unsendMessage(handleReply.messageID, () => {
      api.sendMessage(`Phản hồi tin nhắn này kèm video hoặc reply 0 để kết thúc`, threadID, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          formData,
          uploadVideos,
          type: "video"
        });
      }, messageID);
    });
  }
  
  
  if (handleReply.uploadVideos) {
    let uploads = [];
    for (const attachment of handleReply.uploadVideos) {
      const form = {
        upload_1024: attachment,
        voice_clip: "true"
      };
      uploads.push(api.httpPostFormData("https://upload.facebook.com/ajax/mercury/upload.php", form));
    }
    uploads = await Promise.all(uploads);
    
    for (let result of uploads) {
      if (typeof result == "string") result = JSON.parse(result.replace("for (;;);", ""));
      formData.input.attachments.push({
        "video": {
          "id": result.payload.metadata[0].video_id.toString(),
          "notify_when_processed": true
        }
      });
    }
  }
  */

  const form = {
    av: botID,
    fb_api_req_friendly_name: "ComposerStoryCreateMutation",
    fb_api_caller_class: "RelayModern",
    doc_id: "7711610262190099",
    variables: JSON.stringify(formData)
  };

  api.httpPost('https://www.facebook.com/api/graphql/', form, (e, info) => {
    ;
    try {
      if (e) throw e;
      if (typeof info == "string") info = JSON.parse(info.replace("for (;;);", ""));
      const postID = info.data.story_create.story.legacy_story_hideable_id;
      const urlPost = info.data.story_create.story.url;
      if (!postID) throw info.errors;
      try {
        fs.unlinkSync(__dirname + "/cache/imagePost.png");
        //fs.unlinkSync(__dirname + "/cache/videoPost.mp4");
      }
      catch (e) { }
      return api.sendMessage(`» Post Created Successfully!\n» Post ID: ${postID}\n» Post URL: ${urlPost}`, threadID, messageID);
    }
    catch (e) {
      //console.log(e)
      return api.sendMessage(`Post creation failed, please try again later`, threadID, messageID);
    }
  });
};

function getGUID() {
  var sectionLength = Date.now();
  var id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.floor((sectionLength + Math.random() * 16) % 16);
    sectionLength = Math.floor(sectionLength / 16);
    var _guid = (c == "x" ? r : (r & 7) | 8).toString(16);
    return _guid;
  });
  return id;
}