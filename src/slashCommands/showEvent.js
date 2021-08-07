const { createMsg } = require("../embeds/singleEventMsg");
const { getEventByName } = require("../notion/events");

module.exports = {
  name: "show_event",
  description: "Shows more info of an event, in a post.",
  options: [
    {
      name: "event_name",
      type: "STRING",
      description: "Enter the name of the event",
      required: true,
    },
  ],
  async execute(interaction) {
    const arg = interaction.options.getString("event_name").trim();
    const event = getEventByName(arg, interaction.client.events);

    if (!event) {
      await interaction.reply({
        content: "No such event found. Maybe a typo? :confused:",
        ephemeral: true,
      });
      return;
    }

    const embed = createMsg(event);
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
