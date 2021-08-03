const glob = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = {
  setup: async (client) => {
    // Slash Commands Handler
    const slashCommandFiles = await globPromise(
      `${process.cwd()}/src/slashCommands/**/*.js`
    );
    const slashCommands = [];

    slashCommandFiles.map((file) => {
      const command = require(file);
      if (!command.name) return;

      client.slashCommands.set(command.name, command);
      slashCommands.push(command);
    });

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
  },
};
