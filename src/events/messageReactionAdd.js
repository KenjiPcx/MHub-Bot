const CONST = require("../constants");
const { createUser, updateUser } = require("../notion/user");

// TODO move to embeds
const updatePrefMsg = (username, types, topics) => {
  let typesMsg = "Event Types\n";
  if (types.length === 0) {
    typesMsg += "None";
  } else {
    types.map((type, index) => {
      typesMsg += ` ${index + 1}. ${type}\n`;
    });
  }

  let topicsMsg = "Event Topics\n";
  if (topics.length === 0) {
    topicsMsg += "None";
  } else {
    topics.map((topic, index) => {
      topicsMsg += `  ${index + 1}. ${topic}\n`;
    });
  }

  return `Hi, ${username}.
  You have updated your event preferences.
          
  ${typesMsg}
  ${topicsMsg}
  `;
};

const handleRolesAssignment = async (member, name) => {
  const role = CONST.kEMOJI_MAP.get(name);
  if (role) {
    await member.roles.add(role).catch(console.log);
  }
};

const initPrefArr = (user) => {
  if (!user.typePref) {
    user.typePref = [];
  }
  if (!user.topicPref) {
    user.topicPref = [];
  }
};

const handleCreateUser = async (user, client) => {
  await createUser({
    userId: user.id,
    username: user.username,
    eventTypes: user.typePref,
    eventTopics: user.topicPref,
  })
    .then(async (res) => {
      const page = {
        pageId: res.id,
        userId: userId,
        eventTypes: eventTypes,
        eventTopics: eventTopics,
      };
      client.userToPageMap.set(userId, page);
      await user.send(
        updatePrefMsg(user.username, user.typePref, user.topicPref)
      );
    })
    .catch(console.log);
};

const handleUpdateUser = async (user, client) => {
  const pageId = client.userToPageMap.get(user.id).pageId;
  await updateUser({
    pageId: pageId,
    userId: user.id,
    eventTypes: user.typePref,
    eventTopics: user.topicPref,
  })
    .then(async () => {
      const page = client.userToPageMap.get(userId);
      client.userToPageMap.set(userId, {
        ...page,
        eventTypes,
        eventTopics,
      });
      await user.send(
        updatePrefMsg(user.username, user.typePref, user.topicPref)
      );
    })
    .catch(console.log);
};

const handleUserPref = async (user, interest, client) => {
  if (interest) {
    initPrefArr(user);
    if (reaction.message.id === CONST.kINTERESTS1_MSG_ID) {
      user.typePref.push(interest);
    } else if (reaction.message.id === CONST.kINTERESTS2_MSG_ID) {
      user.topicPref.push(interest);
    } else if (interest === "Save") {
      if (!client.userToPageMap.has(user.id)) {
        await handleCreateUser(user, client).catch(console.log);
      } else {
        await handleUpdateUser(user, client).catch(console.log);
      }
    }
  }
};

module.exports = {
  name: "messageReactionAdd",
  execute: async (reaction, user, client) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);

    // Assign Roles
    if (member && reaction.message.id === CONST.kROLES_MSG_ID) {
      handleRolesAssignment(member, name);
    }

    // Subscribe Notifications
    if (
      reaction.message.id === CONST.kINTERESTS1_MSG_ID ||
      reaction.message.id === CONST.kINTERESTS2_MSG_ID
    ) {
      const interest = CONST.kEMOJI_MAP.get(name);
      handleUserPref(user, interest, client);
    }
  },
};
