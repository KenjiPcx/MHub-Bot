const CONST = require("../constants");
const {
  userToPageMap,
  createUser,
  updateUser,
} = require("../notion/user");

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

module.exports = {
  name: "messageReactionAdd",
  execute: async (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);

    // Assign Roles
    if (member && reaction.message.id === CONST.kROLES_MSG_ID) {
      const role = CONST.kEMOJI_MAP.get(name);
      if (role) {
        await member.roles.add(role).catch(console.log);
      }
    }

    // Subscribe Notifications
    if (
      reaction.message.id === CONST.kINTERESTS1_MSG_ID ||
      reaction.message.id === CONST.kINTERESTS2_MSG_ID
    ) {
      const interest = CONST.kEMOJI_MAP.get(name);

      if (interest) {
        if (!user.typePref) {
          user.typePref = [];
        }

        if (!user.topicPref) {
          user.topicPref = [];
        }

        if (interest === "Save") {
          if (!userToPageMap.has(user.id)) {
            await createUser({
              userId: user.id,
              username: user.username,
              eventTypes: user.typePref,
              eventTopics: user.topicPref,
            })
              .then(() => {
                console.log(userToPageMap);
                user.send(
                  updatePrefMsg(user.username, user.typePref, user.topicPref)
                );
              })
              .catch(console.log);
          } else {
            const pageId = userToPageMap.get(user.id).pageId;
            await updateUser({
              pageId: pageId,
              userId: user.id,
              eventTypes: user.typePref,
              eventTopics: user.topicPref,
            })
              .then(() => {
                console.log(userToPageMap);
                user.send(
                  updatePrefMsg(user.username, user.typePref, user.topicPref)
                );
              })
              .catch(console.log);
          }
        } else if (reaction.message.id === CONST.kINTERESTS1_MSG_ID) {
          user.typePref.push(interest);
        } else if (reaction.message.id === CONST.kINTERESTS2_MSG_ID) {
          user.topicPref.push(interest);
        }

        console.log("\n////////////////////////////////////\n");
        console.log("Event Types", user.typePref);
        console.log("Event Topic", user.topicPref);
        console.log("\n////////////////////////////////////\n");
      }
    }
  },
};
