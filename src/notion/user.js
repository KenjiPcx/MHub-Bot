const { notion } = require("./notion");

const databaseId = process.env.USERS_DATABASE_ID;

const getAllUsers = async () => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const userPages = response.results;
  return userPages.map((page) => {
    return {
      pageId: page.id,
      userId: page.properties.ID.rich_text[0].plain_text,
      eventTypes: page.properties["Event Type Interest"].multi_select.map(
        (type) => type.name
      ),
      eventTopics: page.properties["Event Topic Interest"].multi_select.map(
        (topic) => topic.name
      ),
    };
  });
};


const initUsersMap = async () => {
  const userToPageMap = new Map();
  await getAllUsers().then((res) =>
    res.map((user) => userToPageMap.set(user.userId, user))
  );
  return userToPageMap;
};

const objectify = (arr = []) => {
  return arr.map((item) => {
    return { name: item };
  });
};

const createUser = async (
  { userId, username, eventTypes, eventTopics },
  userToPageMap
) => {
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

const updateUser = async (
  { pageId, userId, eventTypes, eventTopics },
  userToPageMap
) => {
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
  initUsersMap,
  createUser,
  updateUser,
};
