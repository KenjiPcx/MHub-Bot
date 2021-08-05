const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

const getDatabase = async (databaseId) => {
  const response = await notion.databases
    .retrieve({ database_id: databaseId })
    .catch(console.log);
  console.log(response);
};

module.exports = {
  notion,
};


