const { kBOT_ID } = require("../constants");
const { createMsg } = require("../embeds/rolesMsg");
const { createMsg: createAcceptMsg } = require("../embeds/acceptRules")

module.exports = {
  name: "messageCreate",
  execute: async (message, client) => {
    console.log(message.content);
    if (message.author === kBOT_ID) return;

    if (message.content === "Rules") {
      message.send("Rules?");
    }

    if (message.content === "Year Of Study") {
      message.send("Year of Study");
    }
    if (message.content === "Roles") {
      const embed = createMsg();
      client.channels.cache.get("874666025411567686").send({ embeds: [embed] });
    }
    if (message.content === "Accept Rules") {
      const embed = createAcceptMsg();
      client.channels.cache.get("869252924956618813").send({ embeds: [embed] });
    }
  },
};
