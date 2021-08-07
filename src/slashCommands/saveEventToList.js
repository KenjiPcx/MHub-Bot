const { getEventByName } = require("../notion/events");
const { updateUserSavedEvents } = require("../notion/user");

module.exports = {
  name: "save_event_to_list",
  description: "Saves an event into your list",
  options: [
    {
      name: "event_name",
      type: "STRING",
      description: "Enter the name of the event",
      required: true,
    },
  ],
  async execute(interaction) {
    const eventName = interaction.options.getString("event_name").trim();
    const eventPage = getEventByName(eventName, interaction.client.events);
    const userId = interaction.user.id;
    const userData = interaction.client.userToPageMap.get(userId);

    if (!eventPage) {
      await interaction.reply({
        content: "No such event found. Maybe a typo? :confused:",
        ephemeral: true,
      });
      return;
    }

    const eventPageId = eventPage.pageId;

    if (!userData.savedEvents.includes(eventPageId)) {
      const userPageId = userData.pageId;
      const savedEvents = [...userData.savedEvents, eventPageId];

      await updateUserSavedEvents({ userPageId, savedEvents })
        .then(async (res) => {
          interaction.client.userToPageMap.set(userId, {
            ...userData,
            savedEvents,
          });
          await interaction.reply({
            content: "Event added to list successfully",
            ephemeral: true,
          });
        })
        .catch(async (err) => {
          await interaction.reply({
            content: "Failed to add event to list.",
            ephemeral: true,
          });
        });
    } else {
      await interaction.reply({
        content: "Event is already in list",
        ephemeral: true,
      });
    }
  },
};
