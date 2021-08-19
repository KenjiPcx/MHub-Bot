const { Client, Collection, Intents } = require("discord.js");
const mongoose = require("mongoose");
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


// External Data Storage
// mongoose
//   .connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("-Connected to Mongo");
//   })
//   .catch((err) => {
//     console.log(err);
//   });


// Internal Data Storage
client.slashCommands = new Collection();
client.slashCommandsData = [];
client.events = [];
client.saveButtons = new Collection();


// Bot Setup
handler.init(client).catch(console.log);


client.login(process.env.BOT_TOKEN);