const CONST = require("../constants");
const {
  createUser: createNotionUser,
  updateUser: updateNotionUser,
} = require("../notion/user");
const {
  createUser,
  updateUserPreferences,
  getUserByUserId,
} = require("../mongo/controller");
const { createMsg } = require("../embeds/prefMsg");
const { notifyUserByUserId } = require("../init/notifyUserByUserId");

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
  await createNotionUser({
    userId: user.id,
    username: user.username,
    eventTypes: user.typePref,
    eventTopics: user.topicPref,
  })
    .then(async (res) => {
      const userData = {
        userId: user.id,
        pageId: res.id,
        username: user.username,
        eventTypes: user.typePref,
        eventTopics: user.topicPref,
      };
      await createUser(userData);
    })
    .catch(console.log);
};

const handleUpdateUser = async (user, client) => {
  const userData = await getUserByUserId(user.id);
  const pageId = userData.pageId;
  await updateNotionUser({
    pageId: pageId,
    eventTypes: user.typePref,
    eventTopics: user.topicPref,
  })
    .then(async () => {
      await updateUserPreferences({
        userId: user.id,
        eventTypes: user.typePref,
        eventTopics: user.topicPref,
      });
    })
    .catch(console.log);
};

const handleUserPref = async (reaction, user, interest, client) => {
  if (interest) {
    initPrefArr(user);
    if (interest === "Save") {
      const userData = await getUserByUserId(user.id);
      if (!userData) {
        await handleCreateUser(user, client).catch(console.log);
      } else {
        await handleUpdateUser(user, client).catch(console.log);
      }
      const { username, typePref, topicPref } = user;
      const embedMsg = createMsg(username, typePref, topicPref);
      await user.send({
        embeds: [embedMsg],
      });
      if (!userData) {
        await notifyUserByUserId(user.id, client);
      }
    } else if (reaction.message.id === CONST.kINTERESTS1_MSG_ID) {
      user.typePref.push(interest);
    } else if (reaction.message.id === CONST.kINTERESTS2_MSG_ID) {
      user.topicPref.push(interest);
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
      handleUserPref(reaction, user, interest, client);
    }
  },
};
