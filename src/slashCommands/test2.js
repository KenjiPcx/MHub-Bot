module.exports = {
  name: "ping",
  description: "Replies with Long!",
  async execute(interaction) {
    await interaction.reply("pong!");
  },
};
