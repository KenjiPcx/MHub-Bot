const createMsg = (username, types, topics) => {
  let typesMsg = "";
  if (types.length === 0) {
    typesMsg += "None";
  } else {
    types.map((type, index) => {
      typesMsg += ` ${index + 1}. ${type}\n`;
    });
  }

  let topicsMsg = "";
  if (topics.length === 0) {
    topicsMsg += "None";
  } else {
    topics.map((topic, index) => {
      topicsMsg += `  ${index + 1}. ${topic}\n`;
    });
  }

  return {
    color: 0x0099ff,
    title: `Updated Event Preferences`,
    description: `Hi ${username}, you have changed your event preferences.`,
    fields: [
      {
        name: "Event Types",
        value: typesMsg,
      },
      {
        name: "Event Topics",
        value: topicsMsg,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: "Malaysian Hub",
    },
  };
};

module.exports = {
  createMsg,
};