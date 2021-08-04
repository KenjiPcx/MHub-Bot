const { notion } = require("./notion");

const databaseId = process.env.DATABASE_ID;
const userToPageMap = new Map();

const getAllUsers = async () => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  console.log(response.results[0].properties)
};

getAllUsers()

const objectify = (arr = []) => {
  return arr.map((item) => {
    return { name: item };
  });
};

const createUser = async ({ userId, username, eventTypes, eventTopics }) => {
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

const updateUser = async ({ pageId, userId, eventTypes, eventTopics }) => {
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
  userToPageMap,
  createUser,
  updateUser,
};
