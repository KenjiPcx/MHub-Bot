const { Client, Collection, Intents } = require("discord.js");
const handler = require("./init/handler");
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

// Internal Data Storage
client.slashCommands = new Collection();
client.slashCommandsData = [];
client.userToPageMap = new Collection();
client.events = [];
client.saveButtons = new Collection();

// Bot Setup
handler.init(client).catch(console.log);

client.login(process.env.BOT_TOKEN);
