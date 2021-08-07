const CONST = require("../constants");

module.exports = {
  name: "messageReactionRemove",
  execute: async (reaction, user, client) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);

    // Assign Roles
    if (member && reaction.message.id === CONST.kROLES_MSG_ID) {
      const role = CONST.kEMOJI_MAP.get(name);
      if (role) {
        await member.roles.remove(role).catch(console.log);
      }
    }

    // Subscribe Notifications
    if (
      reaction.message.id === CONST.kINTERESTS1_MSG_ID ||
      reaction.message.id === CONST.kINTERESTS2_MSG_ID
    ) {
      const interest = CONST.kEMOJI_MAP.get(name);

      if (interest) {
        if (reaction.message.id === CONST.kINTERESTS1_MSG_ID) {
          user.typePref = user.typePref.filter(type => type !== interest);
        }
        if (reaction.message.id === CONST.kINTERESTS2_MSG_ID) {
          user.topicPref = user.topicPref.filter((topic) => topic !== interest);
        }
      }
    }
  },
};
