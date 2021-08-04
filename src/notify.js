const { getAllEvents } = require("./notion/events");
const { userToPageMap } = require("./notion/user");

console.log(userToPageMap.values());
