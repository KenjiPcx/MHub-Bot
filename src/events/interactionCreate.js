module.exports = {
  name: "interactionCreate",
  execute: async (interaction, client) => {
    if (!interaction.isCommand()) return;

    if (!client.slashCommands.has(interaction.commandName)) return;

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
  },
};
