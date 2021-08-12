const glob = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = {
  init: async (client) => {
    console.log("Initializing Setup");

    // Slash Commands Handler
    const slashCommandFiles = await globPromise(
      `${process.cwd()}/src/slashCommands/**/*.js`
    );
    slashCommandFiles.map((file) => {
      const command = require(file);
      if (!command.name) return;
      client.slashCommands.set(command.name, command);

      if (!command.options) {
        const commandData = {
          name: command.name,
          description: command.description,
        };
        client.slashCommandsData.push(commandData);
      } else {
        const commandData = {
          name: command.name,
          description: command.description,
          options: command.options,
        };
        client.slashCommandsData.push(commandData);
      }
    });
    console.log("-Slash Command Handler Setup Done");

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
    console.log("-Event Handler Setup Done");
  },
};
