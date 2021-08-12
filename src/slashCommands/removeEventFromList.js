const { getEventByName } = require("../notion/events");
const {
  updateUserSavedEvents: updateNotionUserSavedEvents,
} = require("../notion/user");
const {
  getUserByUserId,
  updateUserSavedEvents,
} = require("../mongo/controller");

module.exports = {
  name: "remove_event_from_list",
  description: "Removes an event from your list",
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
    const userId = interaction.user.id;
    // const userData = interaction.client.userToPageMap.get(userId);
    const userData = await getUserByUserId(userId);
    const eventPage = getEventByName(eventName, interaction.client.events);

    if (!eventPage) {
      await interaction.reply({
        content: "No such event found. Maybe a typo? :confused:",
        ephemeral: true,
      });
      return;
    }

    const eventPageId = eventPage.pageId;

    if (userData.savedEvents.includes(eventPageId)) {
      const userPageId = userData.pageId;
      const savedEvents = userData.savedEvents.filter(
        (pageId) => pageId !== eventPageId
      );

      await updateNotionUserSavedEvents({ userPageId, savedEvents })
        .then(async () => {
          // interaction.client.userToPageMap.set(userId, {
          //   ...userData,
          //   savedEvents,
          // });
          await updateUserSavedEvents({ userId, savedEvents })
          await interaction.reply({
            content: "Event removed from list successfully",
            ephemeral: true,
          });
        })
        .catch(async (err) => {
          await interaction.reply({
            content: "Failed to remove event from list.",
            ephemeral: true,
          });
        });
    } else {
      await interaction.reply({
        content: "This event is not found in your list",
        ephemeral: true,
      });
    }
  },
};
