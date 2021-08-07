const CONST = require("../constants");
const { initUsersMap } = require("../notion/user");
const { getAllEvents } = require("../notion/events");
const { notify } = require("../init/notify");

module.exports = {
  name: "ready",
  once: true,
  execute: async (client) => {
    // Deploy slash commands
    await client.guilds.cache
      .get(CONST.kGUILD_ID)
      .commands.set(client.slashCommandsData)
      .then(() => {
        console.log("---Deployed Slash Commands");
      })
      .catch((err) => {
        console.log("xxxFailed to Deploy Slash Commands");
        console.log(err);
      });

    // Initialize events database
    client.events = await getAllEvents()
      .then((res) => {
        setInterval(async () => {
          client.events = await getAllEvents().catch(console.log);
        }, 1000 * 60 * 60 * 12);
        console.log("---Initialized Events Database");
        return res;
      })
      .catch((err) => {
        console.log("xxxFailed to Initialize Events Database");
        console.log(err);
      });

    // Initialize users database
    await initUsersMap(client)
      .then((res) => {
        console.log("---Initialized Users Database");
        return res;
      })
      .catch((err) => {
        console.log("xxxFailed to Initialize Users Database");
        console.log(err);
      });

    // Initialize user weekly notifications
    // await notify(client)
    //   .then(() => {
    //     setInterval(() => {
    //       notify(client);
    //     }, 1000 * 60 * 60 * 24 * 7);
    //     console.log("---Initialized User Notifications");
    //   })
    //   .catch((err) => {
    //     console.log("xxx-Failed to Initialize User Notifications");
    //     console.log(err);
    //   });

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
