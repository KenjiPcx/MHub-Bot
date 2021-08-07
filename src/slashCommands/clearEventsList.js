const { updateUserSavedEvents } = require("../notion/user");

module.exports = {
  name: "clear_events_list",
  description: "Removes all events from your list",
  async execute(interaction) {
    const userId = interaction.user.id;
    const userData = interaction.client.userToPageMap.get(userId);
    const userPageId = userData.pageId;
    const savedEvents = [];

    await updateUserSavedEvents({ userPageId, savedEvents })
      .then(async (res) => {
        interaction.client.userToPageMap.set(userId, {
          ...userData,
          savedEvents,
        });
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
