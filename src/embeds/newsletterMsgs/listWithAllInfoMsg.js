const createMsg = (sponsoredEvents, normalEvents) => {
  let sEvents = "";
  sponsoredEvents.forEach((event, index) => {
    if (index < 10) {
      sEvents += `${index + 1} - [${event.eventName}](${
        event.pageURL
      }), [Register](${event.registrationLink}) 
      ${event.orgContact}
      ${event.caption}\n`;
    }
  });

  let nEvents = "";
  normalEvents.forEach((event, index) => {
    if (index < 10) {
      nEvents += `${index + 1} - [${event.eventName}](${
        event.pageURL
      }), [Register](${event.registrationLink}) 
      ${event.orgContact}
      ${event.caption}\n`;
    }
  });

  const embed = {
    color: 0x0099ff,
    title: `Weekly Events`,
    description: "Here are some events happening this week",
    fields: [
      {
        name: "Sponsored Events",
        value: sEvents,
      },
      {
        name: "Suggested Events",
        value: nEvents,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: "Malaysian Hub",
    },
  };

  return [embed]
};

module.exports = {
  createMsg,
};
