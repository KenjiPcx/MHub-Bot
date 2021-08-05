const CONST = require("../constants");
const { initUsersMap } = require("../notion/user");
const { getAllEvents } = require("../notion/events");
const { notify } = require("../notify");

module.exports = {
  name: "ready",
  once: true,
  execute: async (client) => {

    // Deploy slash commands
    await client.guilds.cache
      .get(CONST.kGUILD_ID)
      .commands.set(client.slashCommandsData)
      .catch(console.log);
    console.log("---Deployed Slash Commands");

    // Initialize user database
    client.userToPageMap = await initUsersMap().catch(console.log);
    console.log("---Initialized Users Database");

    client.events = await getAllEvents().catch(console.log);
    setInterval(async () => {
      client.events = await getAllEvents().catch(console.log);
    }, 1000 * 60 * 60 * 12);
    console.log("---Initialized Events Database");

    // Initialize user weekly notifications
    // notify(client);
    // setInterval(() => {
    //   notify(client);
    // }, 1000 * 60 * 60 * 24 * 7);
    console.log("---Initialized User Notifications");

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
