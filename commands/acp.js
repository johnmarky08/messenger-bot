module.exports.config = {
  name: "acp",
  des: "Friend Request",
  nodeDepends: {},
  author: "Administrator",
  version: "1.0.0",
  perm: 1
};

module.exports.start = async function({ event, api }) {
  const mssg = global.msg.split(" ");
  const moment = require("moment-timezone");
  const form = {
    av: api.getCurrentUserID(),
    fb_api_caller_class: "RelayModern",
    variables: {
      input: {
        source: "friends_tab",
        actor_id: api.getCurrentUserID(),
        client_mutation_id: Math.round(Math.random() * 19).toString()
      },
      scale: 3,
      refresh_num: 0
    }
  };

  const success = [];
  const failed = [];


  const formss = {
    av: api.getCurrentUserID(),
    fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
    fb_api_caller_class: "RelayModern",
    doc_id: "4499164963466303",
    variables: JSON.stringify({ input: { scale: 3 } })
  };
  const listRequest = JSON.parse(await api.httpPost("https://www.facebook.com/api/graphql/", formss)).data.viewer.friending_possibilities.edges;
  let msg = "";
  let i = 0;
  for (const user of listRequest) {
    i++;
    msg += (`\n${i}. 𝐍𝐚𝐦𝐞: ${user.node.name}`
      + `\n𝐈𝐃: ${user.node.id}`
      + `\n𝐔𝐫𝐥: ${user.node.url.replace("www.facebook", "fb")}`
      + `\n𝐓𝐢𝐦𝐞: ${moment(user.time * 1009).tz("Asia/Manila").format("DD/MM/YYYY HH:mm:ss")}\n`);
  }
  if (mssg[0] === "add") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
    form.doc_id = "3147613905362928";
  } else if (mssg[0] === "del") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestDeleteMutation";
    form.doc_id = "4108254489275063";
  } else {
    if (msg.length !== 0) {
      return api.sendMessage(`${msg}`, event.threadID, event.messageID);
    } else {
      return api.sendMessage("There's Currently No People In Your Friend Request Tab.", event.threadID, event.messageID);
    }
  }
  if (mssg[1] === "all") {
    targetIDs = [];
    const lengthList = listRequest.length;
    for (let i = 1; i <= lengthList; i++) targetIDs.push(i);
  }

  const newTargetIDs = [];
  const promiseFriends = [];

  for (const stt of targetIDs) {
    const u = listRequest[parseInt(stt) - 1];
    if (!u) {
      failed.push(`STT ${stt} not found in the list`);
      continue;
    }
    form.variables.input.friend_requester_id = u.node.id;
    form.variables = JSON.stringify(form.variables);
    newTargetIDs.push(u);
    promiseFriends.push(api.httpPost("https://www.facebook.com/api/graphql/", form));
    form.variables = JSON.parse(form.variables);
  }

  const lengthTarget = newTargetIDs.length;
  for (let i = 0; i < lengthTarget; i++) {
    try {
      const friendRequest = await promiseFriends[i];
      if (JSON.parse(friendRequest).errors) failed.push(newTargetIDs[i].node.name);
      else success.push(newTargetIDs[i].node.name);
    }
    catch (e) {
      failed.push(newTargetIDs[i].node.name);
    }
  }
  return api.sendMessage(`» Already ${mssg[0] === 'add' ? 'accepted' : 'deleted'} friend request from ${success.length} person:\n${success.join("\n")}${failed.length > 0 ? `\n» Failed with ${failed.length} people: ${failed.join("\n")}` : ""}`, event.threadID, event.messageID);
}