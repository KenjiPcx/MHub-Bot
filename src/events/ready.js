const CONST = require("../constants");
const { initUsersMap } = require("../notion/user");
const { getAllEvents } = require("../notion/events");
const { notify } = require("../notify");

module.exports = {
  name: "ready",
  once: true,
  execute: async (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    // Initialize internal database
    client.userToPageMap = await initUsersMap().catch(console.log);
    client.events = await getAllEvents().catch(console.log);
    setInterval(() => {
      client.events = getAllEvents();
    }, 1000 * 60 * 60 * 12);
    notify(client);
    setInterval(() => {
      notify(client);
    }, 1000 * 60 * 60 * 24 * 7);
  },
};
