const CONST = require("../constants");

module.exports = {
  name: "messageReactionRemove",
  execute: async (reaction, user) => {
    console.log("Removed");
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);

    if (member && reaction.message.id === CONST.kROLES_MSG_ID) {
      const role = CONST.kEMOJI_MAP.get(name);
      if (role) {
        await member.roles.remove(role).catch(console.log);
      }
    }
  },
};
