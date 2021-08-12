const { createMsg } = require("../embeds/newsletterMsgs/listMsg");
const { filterEvents } = require("./notify");
const { getUserByUserId } = require("../mongo/controller");

const notifyUserByUserId = async (userId, client) => {
  const events = client.events;
  const userData = await getUserByUserId(userId);
  const { eventTypes, eventTopics } = userData;

  const sponsoredEvents = events.filter((event) => event.sponsored);
  const normalEvents = events.filter((event) => !event.sponsored);
  const filteredEvents = filterEvents(normalEvents, eventTypes, eventTopics);
  const embeds = createMsg(sponsoredEvents, filteredEvents);

  await client.users
    .fetch(userId)
    .then((user) => {
      if (user.id !== "871701741865959425") {
        user.send({
          embeds: embeds,
        });
      }
    })
    .catch(console.log);
};

module.exports = {
  notifyUserByUserId,
};
