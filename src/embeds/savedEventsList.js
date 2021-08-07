const { getEventById } = require("../notion/events");

const createMsg = (eventsArr, client) => {
  let data = {
    name: "No Events Saved",
    value: "Save some events with '/save_event_to_list' command.",
  };

  if (eventsArr.length !== 0) {
    let eventsList = "";
    const events = eventsArr.map((pageId) =>
      getEventById(pageId, client.events)
    );
    events.forEach((event, i) => {
      eventsList += `${i + 1}.  [${event.eventName}](${event.pageURL})\n`;
    });

    data = {
      name: "Events",
      value: eventsList,
    };
  }

  return {
    title: "Saved Events List",
    color: 3447003,
    fields: [data],
    timestamp: new Date(),
  };
};

module.exports = {
  createMsg,
};
