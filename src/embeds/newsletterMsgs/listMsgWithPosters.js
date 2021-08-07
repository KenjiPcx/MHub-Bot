const createMsg = (sponsoredEvents, normalEvents) => {
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
    image: {
      url: "https://lh3.googleusercontent.com/cdsHqhrleDbnsjDSukOGULaBga4t0mOeD3l-kopRx2wd7irIYBUbVd6Uz-xoTFuHZhGhKGPqnTkwCSAXkgmOFr3kidu3QLnLV_vW-ZTVAZE2cYzC1_wHw-HOYLVJbF9vlNYcg2EXogCFMLVnkItw83HlDQ7ZCY6lsF-6zg0TuxvI4XvWC74zyq_3NSVXQnwyfphXs2n62C1_jF7dioOWUnm6TSZckPXjUaM9-0EaqRi5P6TRXNOVBSiAKKq_sn44isiGJqcXF71azLh0ecKjSlrqOVbb_NVC81zbBPQTZrBRIoe4yXqXs2cZOOdB7wTzRzqQzTlGIQEjeP-G7buu_obdymZEKy6PeBtTJXxLhqAH6eM7B3SVxmjsvesOUqXghqmlb2S_G1KZ3mA-hn92Fy_omk-IsaWjRMga4QgSfJmOH-4crX5-JcwZxpKH6T0FrNc2C73C09cYaHzMjAax8uTDl0oA3rwqyPgWH2JP572BawklVYnN2IghQjfIL977bd5hjOSNBs-9SIn6DSPyHIOtJQrPXZzlfEQ5BaTu_GWN5Ber-tZsQA47fAp3Kwhjwm87k4wZYRksh5fTyExh7xdPqo1YzZcGrpkSvBU0_Tl071OID-P3RaNRIUhFbdT7rO538_4KWjsgwwTsL7KeY0GbjyT5E3P5Y-LeS2QGKwR_92uu3XScJclNKpdS48pyU4gLsw9it7OM-9C0ug-vEXo=w930-h918-no?authuser=0",
    },
    footer: {
      text: "Malaysian Hub",
    },
  };

  return [embed];
};

module.exports = {
  createMsg,
};
