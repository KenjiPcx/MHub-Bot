const { kBOT_ID } = require("../constants");
const CONST = require("../constants");

module.exports = {
  name: "messageCreate",
  execute: async (message, client) => {
    console.log(message.content);
    if (message.author === kBOT_ID) return;

    if (message.content === "Easter") {
      message.reply("Egg");
    }
  },
};
