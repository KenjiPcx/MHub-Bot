const { updateUserSavedEvents } = require("../notion/user");

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
      const userData = client.userToPageMap.get(userId);
      const eventPageId = client.saveButtons.get(interaction.customId).pageId;

      if (!userData.savedEvents.includes(eventPageId)) {
        await updateUserSavedEvents(
          { userId, userData, eventPageId },
          client.userToPageMap
        ).then(() => {
          interaction.reply({
            content: "Event added into saved list.",
            ephemeral: true,
          });
        }).catch((err) => {
          interaction.reply({
            content: "Something went wrong with the command.",
            ephemeral: true,
          });
        })
      } else {
        interaction.reply({
          content: "Event is already in saved list.",
          ephemeral: true,
        });
      }
    }
  },
};
