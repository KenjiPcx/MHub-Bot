const glob = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const CONST = require("./constants");

module.exports = {
  setup: async (client) => {
    // Slash Commands Handler
    const slashCommandFiles = await globPromise(
      `${process.cwd()}/src/slashCommands/**/*.js`
    );
    slashCommandFiles.map((file) => {
      const command = require(file);
      if (!command.name) return;
      const commandData = {
        name: command.name,
        description: command.description,
      };
      client.slashCommands.set(command.name, command);
      client.slashCommandsData.push(commandData);
    });
    console.log("---Setup Slash Command Handler Done");

    // Event Handler
    const eventFiles = await globPromise(`${process.cwd()}/src/events/**/*.js`);
    eventFiles.forEach((file) => {
      const event = require(file);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    });
    console.log("---Setup Event Handler Done");
  },
};
