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

  const outro = {
    color: 0x0099ff,
    title: `Follow us for more :sunglasses:`,
    fields: [
      {
        name: "Social Media",
        value: `Instagram: [@msiahub](https://www.instagram.com/msiahub/)
        Linkedin: [The Malaysian Hub](https://www.linkedin.com/company/the-malaysian-hub/)`,
      },
      {
        name: "CV Tips and more",
        value: `Linkedin: [@Amin Zakariah](https://www.linkedin.com/in/amin-zakariah/)`,
      },
      {
        name: "Any Events You Want To Promote?",
        value:
          "Contact us or fill in this [form](https://docs.google.com/forms/d/e/1FAIpQLScExNOMRVYjIYOyMgHFZ7ZWLEpm1-qhziQVRHkTtDxvz1GJgA/viewform?pli=1&pli=1)",
      },
    ],
    timestamp: new Date(),
    footer: {
      text: "Malaysian Hub",
      icon_url:
        "https://lh3.googleusercontent.com/x8wsnfcrbcrcdMnAN6ji9lxWZzACyQbnl6j1ID61LhN8IDmlcBQP6JgtXQYq392dyR-VOMHXF7f3p70IT9xUwLB1c8rbWO7PtAUB_LhAnRvN751oP4irMFd-9HnHSoy8QYPzlzJc_xWAdoix-OTE826c07yyITGHDCAA45c-O8uiFmPQlSfROSACWFPSKRx35SUzbyMBIOrVKb_jhWGHe6aKzulR7-aMFXfihGWoF-RIi59l2eeFi-JeS9qISaZ-UxvwhHJKRjuj6zFBgYw8XPOj9OTcmiDzaOc57ePV0cqcGzgdSjJUzBR8GDtX3-CZhHPIBSo8dhesUoXd55-iSJB7KJcYVsoNGVhv1C8lLpuit7uHklT1X9XBXmo3lc_m3ynKWXTIAi4ENfEBDTG1kJv0KEN86h1qr8n4hoo-RPRfv1lTqRZ6rtS-xEu0LVxE9tJD75aMGLpsvoBRwQo-H5f3L7b5uBg2iXWR4Hg10CtzsmjFilui1lf1YbbzxrPVq4kbkSOY_VZc-MQg4ieJ72IuopsN5a191UfrGiGhRuPYCOxVYUxrJjVmJMMhTDsTrbMUGuxakD0Nk5Bao3XVCt-eGWniMGIJO_zp9UA5kRveO3GzNgM5xM2XvOLra7UQsdZnbvGzagyfDX01KGgxWfOKbUFvzMX28YKLYgGOyV7tORRCSDU9U-5MC75fBZlnsxnqdWoKy2YMK1gqId4Dl_o=w137-h132-no?authuser=0",
    },
  };

  const sEmbed = {
    color: 0x0099ff,
    title: `Hot and Anticipated Events`,
    description: `Here are some popular events to check out:exclamation:`,
    fields: sEvents,
    timestamp: new Date(),
    footer: {
      text: "Malaysian Hub",
      icon_url:
        "https://lh3.googleusercontent.com/x8wsnfcrbcrcdMnAN6ji9lxWZzACyQbnl6j1ID61LhN8IDmlcBQP6JgtXQYq392dyR-VOMHXF7f3p70IT9xUwLB1c8rbWO7PtAUB_LhAnRvN751oP4irMFd-9HnHSoy8QYPzlzJc_xWAdoix-OTE826c07yyITGHDCAA45c-O8uiFmPQlSfROSACWFPSKRx35SUzbyMBIOrVKb_jhWGHe6aKzulR7-aMFXfihGWoF-RIi59l2eeFi-JeS9qISaZ-UxvwhHJKRjuj6zFBgYw8XPOj9OTcmiDzaOc57ePV0cqcGzgdSjJUzBR8GDtX3-CZhHPIBSo8dhesUoXd55-iSJB7KJcYVsoNGVhv1C8lLpuit7uHklT1X9XBXmo3lc_m3ynKWXTIAi4ENfEBDTG1kJv0KEN86h1qr8n4hoo-RPRfv1lTqRZ6rtS-xEu0LVxE9tJD75aMGLpsvoBRwQo-H5f3L7b5uBg2iXWR4Hg10CtzsmjFilui1lf1YbbzxrPVq4kbkSOY_VZc-MQg4ieJ72IuopsN5a191UfrGiGhRuPYCOxVYUxrJjVmJMMhTDsTrbMUGuxakD0Nk5Bao3XVCt-eGWniMGIJO_zp9UA5kRveO3GzNgM5xM2XvOLra7UQsdZnbvGzagyfDX01KGgxWfOKbUFvzMX28YKLYgGOyV7tORRCSDU9U-5MC75fBZlnsxnqdWoKy2YMK1gqId4Dl_o=w137-h132-no?authuser=0",
    },
  };

  const nEmbed = {
    color: 0x0099ff,
    title: `Events happening this week`,
    description: "Based on your preferences.",
    fields: nEvents,
    timestamp: new Date(),
    footer: {
      text: "Malaysian Hub",
      icon_url:
        "https://lh3.googleusercontent.com/x8wsnfcrbcrcdMnAN6ji9lxWZzACyQbnl6j1ID61LhN8IDmlcBQP6JgtXQYq392dyR-VOMHXF7f3p70IT9xUwLB1c8rbWO7PtAUB_LhAnRvN751oP4irMFd-9HnHSoy8QYPzlzJc_xWAdoix-OTE826c07yyITGHDCAA45c-O8uiFmPQlSfROSACWFPSKRx35SUzbyMBIOrVKb_jhWGHe6aKzulR7-aMFXfihGWoF-RIi59l2eeFi-JeS9qISaZ-UxvwhHJKRjuj6zFBgYw8XPOj9OTcmiDzaOc57ePV0cqcGzgdSjJUzBR8GDtX3-CZhHPIBSo8dhesUoXd55-iSJB7KJcYVsoNGVhv1C8lLpuit7uHklT1X9XBXmo3lc_m3ynKWXTIAi4ENfEBDTG1kJv0KEN86h1qr8n4hoo-RPRfv1lTqRZ6rtS-xEu0LVxE9tJD75aMGLpsvoBRwQo-H5f3L7b5uBg2iXWR4Hg10CtzsmjFilui1lf1YbbzxrPVq4kbkSOY_VZc-MQg4ieJ72IuopsN5a191UfrGiGhRuPYCOxVYUxrJjVmJMMhTDsTrbMUGuxakD0Nk5Bao3XVCt-eGWniMGIJO_zp9UA5kRveO3GzNgM5xM2XvOLra7UQsdZnbvGzagyfDX01KGgxWfOKbUFvzMX28YKLYgGOyV7tORRCSDU9U-5MC75fBZlnsxnqdWoKy2YMK1gqId4Dl_o=w137-h132-no?authuser=0",
    },
  };

  const graphics = {
    color: 0x0099ff,
    title: `Weekly Newsletter`,
    description: "Here are some events happening this week",
    image: {
      url: "https://lh3.googleusercontent.com/xw-W__8SC_jNGPIvPhrkIEx648fhEZzITosu7-8EbxfYbiWJLGhEL_IL0tQDj1428cVBogeDAq4XROjMGk54qJZSyasCFu3VcrNHmHFkGoSgRx9MAuORObVbdMM6uecJuuevnz-LrJJBniDZ5JAubYnNr_levIduPV2ThxNpo-URPSE4O98Mhlv59B0agAV1rMMzISG299IJ-lAgaQr7_6jUjwsDzFz5KBDf5VsPISnCH11eMK7847oe-qtQqTef1u4viNsMLxh3SN7TCiAbXvp0k2N9f1riPp9foJYBHt5CsZ-52FpZYWjxTfs7RgP-_8kU1coKWp4L0O6f0i4Hy1dJBkeo8pa8RfEA1x0uztpwpTFQ8AFLwgk4J920_7AroYh_ofNjLPasl4Hx6DNYR17TkyYGfUQh_C0IIQU6Ne21wcC1NIhXejTVZ4yH5FFKCLsIbE5FY6Q8vkpHI1TIs0UQoihKegXRF3E80Y4ynO8gmBONfaGqHBUrFzliy-wq-Ef4qtGMDlWzmNtd0E1-ffwPwIN5XP7H6bvlmk5T54hR5JuK4Tv10RnXUjqkP3arlrvhFWzenjjh5ZG0PGDg0OH4mgLOxMlMwbkhMotDeJyEuo_qPH6Rfe7FiK0_8VUwzormbluaeo9Pdm6KOJGSdI8jTqTSAnYTDWcbIy04q3ZT902EJp1WD5tU_kdYV8e9gKT7Lm4yGWdJ3Km8ptFLW_0=w1377-h918-no?authuser=0",
    },
    timestamp: new Date(),
    footer: {
      text: "Malaysian Hub",
      icon_url:
        "https://lh3.googleusercontent.com/x8wsnfcrbcrcdMnAN6ji9lxWZzACyQbnl6j1ID61LhN8IDmlcBQP6JgtXQYq392dyR-VOMHXF7f3p70IT9xUwLB1c8rbWO7PtAUB_LhAnRvN751oP4irMFd-9HnHSoy8QYPzlzJc_xWAdoix-OTE826c07yyITGHDCAA45c-O8uiFmPQlSfROSACWFPSKRx35SUzbyMBIOrVKb_jhWGHe6aKzulR7-aMFXfihGWoF-RIi59l2eeFi-JeS9qISaZ-UxvwhHJKRjuj6zFBgYw8XPOj9OTcmiDzaOc57ePV0cqcGzgdSjJUzBR8GDtX3-CZhHPIBSo8dhesUoXd55-iSJB7KJcYVsoNGVhv1C8lLpuit7uHklT1X9XBXmo3lc_m3ynKWXTIAi4ENfEBDTG1kJv0KEN86h1qr8n4hoo-RPRfv1lTqRZ6rtS-xEu0LVxE9tJD75aMGLpsvoBRwQo-H5f3L7b5uBg2iXWR4Hg10CtzsmjFilui1lf1YbbzxrPVq4kbkSOY_VZc-MQg4ieJ72IuopsN5a191UfrGiGhRuPYCOxVYUxrJjVmJMMhTDsTrbMUGuxakD0Nk5Bao3XVCt-eGWniMGIJO_zp9UA5kRveO3GzNgM5xM2XvOLra7UQsdZnbvGzagyfDX01KGgxWfOKbUFvzMX28YKLYgGOyV7tORRCSDU9U-5MC75fBZlnsxnqdWoKy2YMK1gqId4Dl_o=w137-h132-no?authuser=0",
    },
  };

  return [outro, nEmbed, sEmbed, graphics];
};

module.exports = {
  createMsg,
};
