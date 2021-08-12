const { kROLES_CHANNEL_ID } = require("../constants")
const { sendMsg: sendRolesMsg } = require("../embeds/rolesMsg");
const { sendMsg: sendMsg1 } = require("../embeds/subscribeInterests1");
const { sendMsg: sendMsg2 } = require("../embeds/subscribeInterests2");

module.exports = {
  name: "init_msgs",
  description: "Initialize Messages",
  async execute(interaction) {
    sendRolesMsg(interaction.client, kROLES_CHANNEL_ID);
    sendMsg1(interaction.client, kROLES_CHANNEL_ID);
    sendMsg2(interaction.client, kROLES_CHANNEL_ID);
    await interaction.reply("Sent");
  },
};
