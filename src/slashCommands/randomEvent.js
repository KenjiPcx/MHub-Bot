const { createMsg } = require("../embeds/singleEventMsg");

const randomChoice = (arr) => {
  const randInt = Math.floor(Math.random() * arr.length);
  return arr[randInt];
};

module.exports = {
  name: "random_event",
  description: "Sends you a random event to check out.",
  async execute(interaction) {
    // const user = interaction.member.user;
    const event = randomChoice(interaction.client.events);
    const embedMsg = createMsg(event);
    await interaction.reply({
      embeds: [embedMsg],
      ephemeral: true,
    });
  },
};
