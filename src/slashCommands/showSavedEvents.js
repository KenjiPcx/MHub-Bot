const { createMsg } = require("../embeds/savedEventsList");

module.exports = {
  name: "show_saved_events",
  description: "Displays your list of saved events",
  async execute(interaction) {
    const userId = interaction.user.id;
    const userData = await interaction.client.userToPageMap.get(userId);
    const embedMsg = createMsg(userData.savedEvents, interaction.client);

    await interaction.reply({
      embeds: [embedMsg],
      ephemeral: true,
    });
  },
};
