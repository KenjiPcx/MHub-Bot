const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
dotenv.config();

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

const objectify = (arr = []) => {
  return arr.map((item) => {
    return { name: item };
  });
};

const createDbEntry = async ({ userId, username, eventTypes, eventTopics }) => {
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
                content: username,
              },
            },
          ],
        },
        Id: {
          rich_text: [
            {
              type: "text",
              text: {
                content: userId,
              },
            },
          ],
        },
        "Event Type Interest": {
          multi_select: objectify(eventTypes),
        },
        "Event Topic Interest": {
          multi_select: objectify(eventTopics),
        },
      },
    })
    .then((res) => {
      const page = {
        pageId: res.id,
        userId: userId,
        eventTypes: eventTypes,
        eventTopics: eventTopics,
      };
      userToPageMap.set(userId, page);
    })
    .catch(console.log);
};

const updateDbEntry = async ({ pageId, userId, eventTypes, eventTopics }) => {
  await notion.pages
    .update({
      page_id: pageId,
      properties: {
        "Event Type Interest": {
          multi_select: objectify(eventTypes),
        },
        "Event Topic Interest": {
          multi_select: objectify(eventTopics),
        },
      },
    })
    .then((res) => {
      const page = userToPageMap.get(userId);
      userToPageMap.set(userId, { ...page, eventTypes, eventTopics });
    })
    .catch(console.log);
};

module.exports = {
  notion,
  getDatabase,
  createDbEntry,
  updateDbEntry,
  getAllPages,
  getUserId,
  userToPageMap,
};


