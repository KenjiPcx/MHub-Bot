const embedMessage = ({ sponsoredEvents, normalEvents }, client) => {
  let sEvents = "";
  sponsoredEvents.forEach((event, index) => {
    if (index < 10) {
      sEvents += `${index + 1} - [${event.eventName}](${
        event.pageURL
      }), [Register](${event.registrationLink}) \n`;
    }
  });

  let nEvents = "";
  normalEvents.forEach((event, index) => {
    if (index < 10) {
      nEvents += `${index + 1} - [${event.eventName}](${
        event.pageURL
      }), [Register](${event.registrationLink}) \n`;
    }
  });

  return {
    color: 0x0099ff,
    title: "Weekly Newsletter",
    description: "Here are some events for this week",
    fields: [
      {
        name: "\u200b",
        value: "\u200b",
      },
      {
        name: "Sponsored Events",
        value: sEvents,
      },
      {
        name: "\u200b",
        value: "\u200b",
      },
      {
        name: "Suggested Events",
        value: nEvents,
      },
      {
        name: "\u200b",
        value: "\u200b",
      },
    ],
    timestamp: new Date(),
    footer: {
      text: "Malaysian Hub",
    },
  };
};

const notify = (client) => {
  const events = client.events;
  const users = Array.from(client.userToPageMap.values());
  users.pop();

  users.forEach((userPage, i) => {
    const { userId, eventTypes, eventTopics } = userPage;

    let filteredEvents = [];
    let doubleFilteredEvents = [];
    let sponsoredEvents = [];

    // Filter Types and Sponsored
    for (const event of events) {
      if (event.sponsored) {
        sponsoredEvents.push(event);
      } else {
        for (const type of event.eventType) {
          if (eventTypes.includes(type)) {
            filteredEvents.push(event);
            break;
          }
        }
      }
    }

    //Filter Topics
    for (const event of filteredEvents) {
      for (const topic of event.eventTopics) {
        if (eventTopics.includes(topic)) {
          doubleFilteredEvents.push(event);
          break;
        }
      }
    }

    client.users
      .fetch(userId)
      .then((user) => {
        if (user.id !== "871701741865959425") {
          user.send({
            embeds: [
              embedMessage(
                {
                  sponsoredEvents: sponsoredEvents,
                  normalEvents: doubleFilteredEvents,
                },
                client
              ),
            ],
          });
        }
      })
      .catch(console.log);
  });
};

module.exports = {
  notify,
};
