const Database = require("@replit/database")

// Repl Internal Database
const db = new Database()
// db.list().then(res => db.get(res[0]).then(console.log));
// db.list().then(res => db.delete(res[0]));
module.exports = db