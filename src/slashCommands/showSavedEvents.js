const { createMsg } = require("../embeds/savedEventsList");
const { getUserByUserId } = require("../mongo/controller");
const db = require("../replDb.js")

module.exports = {
  name: "show_saved_events",
  description: "Displays your list of saved events",
  async execute(interaction) {
    const userId = interaction.user.id;
    // const userData = await interaction.client.userToPageMap.get(userId);
    // const userData = await getUserByUserId(userId);
    const userData = await db.get(userId).catch(console.log);
    const embedMsg = createMsg(userData.savedEvents, interaction.client);

    await interaction.reply({
      embeds: [embedMsg],
      ephemeral: true,
    });
  },
};
