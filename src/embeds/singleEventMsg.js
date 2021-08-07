const createMsg = (event) => {
  return {
    title: event.eventName,
    url: event.pageURL,
    description: event.caption,
    color: 3447003,
    image: {
      url: event.posterURL,
    },
    fields: [
      {
        name: "Details:",
        value: `[Register Here](${event.registrationLink})
                Deadline: ${event.registrationDeadline.start}`,
      },
    ],
    timestamp: new Date(),
  };
};

module.exports = {
  createMsg,
};
