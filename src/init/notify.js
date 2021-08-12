const { createMsg } = require("../embeds/newsletterMsgs/listMsg");
const { getAllUsers } = require("../mongo/controller");

const filterType = (events, eventTypes) => {
  const filteredArr = [];
  for (const event of events) {
    for (const type of event.eventType) {
      if (eventTypes.includes(type)) {
        filteredArr.push(event);
        break;
      }
    }
  }
  return filteredArr;
};

const filterTopics = (events, eventTopics) => {
  const filteredArr = [];
  for (const event of events) {
    for (const topic of event.eventTopics) {
      if (eventTopics.includes(topic)) {
        filteredArr.push(event);
        break;
      }
    }
  }
  return filteredArr;
};

const filterEvents = (events, eventTypes, eventTopics) => {
  return filterTopics(filterType(events, eventTypes), eventTopics);
};

const notify = async (client) => {
  const events = client.events;
  // const users = Array.from(client.userToPageMap.values());
  const users = await getAllUsers().catch(console.log);

  users.forEach(async (userPage, i) => {
    const { userId, eventTypes, eventTopics } = userPage;

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
  });
};

module.exports = {
  notify,
  filterEvents,
};
