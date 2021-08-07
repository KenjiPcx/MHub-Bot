const {
  createMsg: createListMsg,
} = require("../embeds/newsletterMsgs/listMsg");
const {
  createMsg: createListWithPostersMsg,
} = require("../embeds/newsletterMsgs/listMsgWithPosters");
const {
  createMsg: createListWithAllInfoMsg,
} = require("../embeds/newsletterMsgs/listWithAllInfoMsg");
const {
  createMsg: createListWithCaptionMsg,
} = require("../embeds/newsletterMsgs/listWithCaptionMsg");
const {
  createMsg: createListWithCaptionMsgAlt,
} = require("../embeds/newsletterMsgs/listWithCaptionMsgAlt");
const {
  createMsg: createListWithOrganizerMsg,
} = require("../embeds/newsletterMsgs/listWithOrganizerMsg");
const {
  createMsg: createListWithTagsMsg,
} = require("../embeds/newsletterMsgs/listWithTagsMsg");

module.exports = {
  name: "newsletter_variation",
  description: "Sends a variation of the newsletter",
  options: [
    {
      name: "var",
      type: "INTEGER",
      description: "Enter the variation (1,2,3,4)",
      required: true,
    },
  ],
  async execute(interaction) {
    const variation = interaction.options.getInteger("var");

    const client = interaction.client;
    const sponsoredEvents = client.events.filter((event) => event.sponsored);
    const normalEvents = client.events.filter((event) => !event.sponsored);

    let embeds;
    if (variation === 1) {
      embeds = createListMsg(sponsoredEvents, normalEvents);
    }
    if (variation === 2) {
      embeds = createListWithPostersMsg(sponsoredEvents, normalEvents);
    }
    if (variation === 3) {
      embeds = createListWithOrganizerMsg(sponsoredEvents, normalEvents);
    }
    if (variation === 4) {
      embeds = createListWithTagsMsg(sponsoredEvents, normalEvents);
    }
    // Failed
    if (variation === 5) {
      embeds = createListWithCaptionMsg(sponsoredEvents, normalEvents);
    }
    if (variation === 6) {
      embeds = createListWithCaptionMsgAlt(sponsoredEvents, normalEvents);
    }
    if (variation === 7) {
      embeds = createListWithAllInfoMsg(sponsoredEvents, normalEvents);
    }

    interaction.reply({ embeds: embeds });
  },
};
