const CONST = require("../constants");

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
    if (member && reaction.message.id === CONST.kINTERESTS1_MSG_ID) {
      const interest = CONST.kEMOJI_MAP.get(name);

      if (!user.reactions) {
        user.eventPref = [];
      }

      if (interest === "Save") {
        console.log("Updated Preference")
        // Send to db

        // if user in db
        // update
        
        // else if !user in db
        // create

      } else if(interest) {
        user.eventPref.push(interest);
        console.log(user.eventPref);
      }
    }

    if (member && reaction.message.id === CONST.kINTERESTS2_MSG_ID) {
      const interest = CONST.kEMOJI_MAP.get(name);

      if (!user.reactions) {
        user.topicPref = [];
      }

      if (interest === "Save") {
        console.log("Updated Preference");
        // Send to db

      } else if (interest) {
        user.topicPref.push(interest);
        console.log(user.topicPref);
      }
    }
  },
};
