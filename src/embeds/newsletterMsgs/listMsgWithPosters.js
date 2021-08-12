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
      url: "https://lh3.googleusercontent.com/xw-W__8SC_jNGPIvPhrkIEx648fhEZzITosu7-8EbxfYbiWJLGhEL_IL0tQDj1428cVBogeDAq4XROjMGk54qJZSyasCFu3VcrNHmHFkGoSgRx9MAuORObVbdMM6uecJuuevnz-LrJJBniDZ5JAubYnNr_levIduPV2ThxNpo-URPSE4O98Mhlv59B0agAV1rMMzISG299IJ-lAgaQr7_6jUjwsDzFz5KBDf5VsPISnCH11eMK7847oe-qtQqTef1u4viNsMLxh3SN7TCiAbXvp0k2N9f1riPp9foJYBHt5CsZ-52FpZYWjxTfs7RgP-_8kU1coKWp4L0O6f0i4Hy1dJBkeo8pa8RfEA1x0uztpwpTFQ8AFLwgk4J920_7AroYh_ofNjLPasl4Hx6DNYR17TkyYGfUQh_C0IIQU6Ne21wcC1NIhXejTVZ4yH5FFKCLsIbE5FY6Q8vkpHI1TIs0UQoihKegXRF3E80Y4ynO8gmBONfaGqHBUrFzliy-wq-Ef4qtGMDlWzmNtd0E1-ffwPwIN5XP7H6bvlmk5T54hR5JuK4Tv10RnXUjqkP3arlrvhFWzenjjh5ZG0PGDg0OH4mgLOxMlMwbkhMotDeJyEuo_qPH6Rfe7FiK0_8VUwzormbluaeo9Pdm6KOJGSdI8jTqTSAnYTDWcbIy04q3ZT902EJp1WD5tU_kdYV8e9gKT7Lm4yGWdJ3Km8ptFLW_0=w1377-h918-no?authuser=0",
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
