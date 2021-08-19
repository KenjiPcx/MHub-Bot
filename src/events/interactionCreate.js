const {
  updateUserSavedEvents: updateNotionUserSavedEvents,
} = require("../notion/user");
// const {
//   getUserByUserId,
//   updateUserSavedEvents,
// } = require("../mongo/controller");
const db = require("../replDb.js");

module.exports = {
  name: "interactionCreate",
  execute: async (interaction, client) => {
    // Slash Commands
    if (
      interaction.isCommand() &&
      client.slashCommands.has(interaction.commandName)
    ) {
      try {
        await client.slashCommands
          .get(interaction.commandName)
          .execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }

    // Buttons
    if (
      interaction.isButton() &&
      client.saveButtons.has(interaction.customId)
    ) {
      const userId = interaction.user.id;
      // const userData = client.userToPageMap.get(userId);
      // const userData = await getUserByUserId(userId);
      const userData = await db.get(userId).catch(console.log);
      const eventPageId = client.saveButtons.get(interaction.customId).pageId;

      if (!userData.savedEvents.includes(eventPageId)) {
        const userPageId = userData.pageId;
        const savedEvents = [...userData.savedEvents, eventPageId];

        await updateNotionUserSavedEvents({ userPageId, savedEvents })
          .then(async () => {
            // client.userToPageMap.set(userId, { ...userData, savedEvents });
            // await updateUserSavedEvents({ userId, savedEvents });
            const updatedUserData = {
              ...userData,
              savedEvents: savedEvents
            };
            await db.set(userId, updatedUserData);
            await interaction.reply({
              content: "Event added into saved list.",
              ephemeral: true,
            });
          })
          .catch(async (err) => {
            await interaction.reply({
              content: "Something went wrong with the command.",
              ephemeral: true,
            });
          });
      } else {
        interaction.reply({
          content: "Event is already in saved list.",
          ephemeral: true,
        });
      }
    }
  },
};
