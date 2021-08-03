const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
dotenv.config("../.env");

console.log()
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

const userToPageMap = new Map();

const databaseId = process.env.DATABASE_ID;

const getDatabase = async () => {
  const response = await notion.databases
    .retrieve({ database_id: databaseId })
    .catch(console.log);
  console.log(response);
};

const getAllPages = async () => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results;
};

const getUserId = (userData) => {
  return userData.properties.Id.rich_text[0].plain_text;
};

const createDbEntry = async () => {
  await notion.pages
    .create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Username: {
          title: [
            {
              text: {
                content: "",
              },
            },
          ],
        },
        Id: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "",
              },
            },
          ],
        },
        "Event Type Interest": {
          multi_select: [{ name: "Mentorship" }],
        },
        "Event Topic Interest": {
          multi_select: [{ name: "Technology" }],
        },
      },
    })
    .then((res) => {
      const userId = res.properties.Id.rich_text[0].plain_text;
      const pageId = res.id;
      userToPageMap.set(userId, pageId);
    })
    .catch(console.log);
};

const updateDbEntry = async (pageId) => {
  await notion.pages.update({
    page_id: pageId,
    properties: {
      Username: {
        title: [
          {
            text: {
              content: "",
            },
          },
        ],
      },
      "Event Type Interest": {
        multi_select: [{ name: "Mentorship" }],
      },
      "Event Topic Interest": {
        multi_select: [
          { name: "Technology" },
          { name: "Education" },
          { name: "Engineering" },
        ],
      },
    },
  });
};

module.exports = {
  notion,
  getDatabase,
  createDbEntry,
  updateDbEntry,
  getAllPages,
  getUserId,
};

createDbEntry().then(() => {
  console.log(userToPageMap);
});
// updateDbEntry(userToPageMap.get(userId));
