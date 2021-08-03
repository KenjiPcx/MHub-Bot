const CONST = require("../constants");

module.exports = {
  name: "messageReactionAdd",
  execute: async (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);

    if (member && reaction.message.id === CONST.kROLES_MSG_ID) {
      const role = CONST.kEMOJI_MAP.get(name);
      if (role) {
        await member.roles.add(role).catch(console.log);
      }
    }
  },
};
