const { Client, Collection, Intents } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.slashCommands = new Collection();
client.slashCommandsData = [];

client.userToPageMap = new Collection();
client.events = [];

console.log("Initializing Setup");
require("./handler").setup(client).catch(console.log);

client.login(process.env.BOT_TOKEN);
