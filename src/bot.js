const { Client, Collection, Intents } = require("discord.js");
const CONST = require("./constants");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ["MESSAGE", "REACTION"],
});

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageReactionAdd", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);

  if (member && reaction.message.id === CONST.ROLES_MSG_ID) {
    const role = CONST.emoji_map.get(name);
    if (role) {
      member.roles.add(role).catch(console.log);
    }
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);

  if (member && reaction.message.id === CONST.ROLES_MSG_ID) {
    const role = CONST.emoji_map.get(name);
    if (role) {
      member.roles.remove(role).catch(console.log);
    }
  }
});

client.login(process.env.BOT_TOKEN);
