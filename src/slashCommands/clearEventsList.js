const {
  updateUserSavedEvents: updateNotionUserSavedEvents,
} = require("../notion/user");
const {
  getUserByUserId,
  updateUserSavedEvents,
} = require("../mongo/controller");
const db = require("../replDb.js")

module.exports = {
  name: "clear_events_list",
  description: "Removes all events from your list",
  async execute(interaction) {
    const userId = interaction.user.id;
    // const userData = interaction.client.userToPageMap.get(userId);
    // const userData = await getUserByUserId(userId);
    const userData = await db.get(userId).catch(console.log);
    const userPageId = userData.pageId;
    const savedEvents = [];

    await updateNotionUserSavedEvents({ userPageId, savedEvents })
      .then(async () => {
        // interaction.client.userToPageMap.set(userId, {
        //   ...userData,
        //   savedEvents,
        // });
        // await updateUserSavedEvents({ userId, savedEvents });
        const updatedUserData = {...userData, savedEvents: savedEvents};
        await db.set(userId, updatedUserData).catch(console.log);
        await interaction.reply({
          content: "Cleared events list successfully",
          ephemeral: true,
        });
      })
      .catch(async (err) => {
        await interaction.reply({
          content: "Failed to clear events list.",
          ephemeral: true,
        });
      });
  },
};
