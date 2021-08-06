const { MessageActionRow, MessageButton } = require("discord.js");
const { createMsg } = require("../embeds/singleEventMsg");

const randomChoice = (arr) => {
  const randInt = Math.floor(Math.random() * arr.length);
  return arr[randInt];
};

module.exports = {
  name: "random_event",
  description: "Sends you a random event to check out.",
  async execute(interaction) {
    const client = interaction.client;
    const event = randomChoice(client.events);
    const embedMsg = createMsg(event);
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(event.pageId)
        .setLabel("Save Event")
        .setStyle("PRIMARY")
    );

    client.saveButtons.set(event.pageId, {
      pageId: event.pageId,
      name: event.eventName,
    });

    await interaction.reply({
      embeds: [embedMsg],
      components: [row],
      ephemeral: true,
    });
  },
};
