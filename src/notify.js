const { createMsg } = require("./embeds/newsletterMsg");

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

const notify = (client) => {
  const events = client.events;
  const users = Array.from(client.userToPageMap.values());
  users.pop();

  users.forEach((userPage, i) => {
    const { userId, eventTypes, eventTopics } = userPage;

    try {
      const sponsoredEvents = events.filter((event) => event.sponsored);
      const normalEvents = events.filter((event) => !event.sponsored);
      const filteredEvents = filterEvents(normalEvents, eventTypes, eventTopics)
      const embedMsg = createMsg(sponsoredEvents, filteredEvents);
  
      client.users
        .fetch(userId)
        .then((user) => {
          if (user.id !== "871701741865959425") {
            user.send({
              embeds: [embedMsg],
            });
          }
        })
        .catch(console.log);
      
      console.log("---Initialized User Notifications");

    } catch (err) {
      console.log("xxx-Failed to Initialize User Notifications")
    }
  });
};

module.exports = {
  notify,
};
