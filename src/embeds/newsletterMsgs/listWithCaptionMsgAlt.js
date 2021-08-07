const createMsg = (sponsoredEvents, normalEvents) => {
  let sEvents = [];
  sponsoredEvents.forEach((event, index) => {
    if (index < 10) {
      sEvents.push({
        name: `${index + 1} - ${event.eventName}`,
        value: `${event.caption} 
            [Register Here](${event.registrationLink}), [More Info](${event.pageURL})`,
      });
    }
  });

  let nEvents = [];
  normalEvents.forEach((event, index) => {
    if (index < 10) {
      nEvents.push({
        name: `${index + 1} - ${event.eventName}`,
        value: `${event.caption} 
            [Register Here](${event.registrationLink}), [More Info](${event.pageURL})`,
      });
    }
  });

  const intro = {
    color: 0x0099ff,
    title: `Weekly Newsletter`,
    description: "Here are some events happening this week",
    timestamp: new Date(),
  };

  const sEmbed = {
    color: 0x0099ff,
    title: `Sponsored Events`,
    description: "Here are some events happening this week",
    fields: sEvents,
    timestamp: new Date(),
    footer: {
      text: "Malaysian Hub",
    },
  };

  const nEmbed = {
    color: 0x0099ff,
    title: `Weekly Events`,
    description: "Based on your preferences.",
    fields: nEvents,
    timestamp: new Date(),
    footer: {
      text: "Malaysian Hub",
    },
  };

  return [intro, sEmbed, nEmbed];
};

module.exports = {
  createMsg,
};
