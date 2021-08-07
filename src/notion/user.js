const { notion } = require("./notion");

const databaseId = process.env.USERS_DATABASE_ID;

const getAllUsers = async () => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results.map((page) => {
    return {
      pageId: page.id,
      userId: page.properties.ID.rich_text[0].plain_text,
      eventTypes: page.properties["Event Type Interest"].multi_select.map(
        (type) => type.name
      ),
      eventTopics: page.properties["Event Topic Interest"].multi_select.map(
        (topic) => topic.name
      ),
      savedEvents: page.properties["Saved Events"].relation.map(
        (event) => event.id
      ),
    };
  });
};

const getUserById = (pageId) => {
  return notion.pages.retrieve({ page_id: pageId });
};

const initUsersMap = async (client) => {
  await getAllUsers().then((res) =>
    res.map((user) => client.userToPageMap.set(user.userId, user))
  );
};

const objectifyName = (arr = []) => {
  return arr.map((item) => {
    return { name: item };
  });
};

const objectifyIds = (arr = []) => {
  return arr.map((item) => {
    return { id: item };
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
          multi_select: objectifyName(eventTypes),
        },
        "Event Topic Interest": {
          multi_select: objectifyName(eventTopics),
        },
        "Saved Events": {
          relation: [],
        },
      },
    })
    .catch(console.log);
};

const updateUser = async (
  { pageId, userId, eventTypes, eventTopics },
  userToPageMap
) => {
  await notion.pages
    .update({
      page_id: pageId,
      properties: {
        "Event Type Interest": {
          multi_select: objectifyName(eventTypes),
        },
        "Event Topic Interest": {
          multi_select: objectifyName(eventTopics),
        },
      },
    })
    .then((res) => {
      const page = userToPageMap.get(userId);
      userToPageMap.set(userId, { ...page, eventTypes, eventTopics });
    })
    .catch(console.log);
};

const updateUserSavedEvents = async ({ userPageId, savedEvents }) => {
  await notion.pages
    .update({
      page_id: userPageId,
      properties: {
        "Saved Events": {
          relation: objectifyIds(savedEvents),
        },
      },
    })
    .catch(console.log);
};

module.exports = {
  initUsersMap,
  createUser,
  updateUser,
  updateUserSavedEvents,
  getUserById,
};
