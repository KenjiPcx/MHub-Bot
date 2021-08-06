const { notion } = require("./notion");
const { getEventById } = require("./events");

const databaseId = process.env.USERS_DATABASE_ID;

const getAllUsers = async (events) => {
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
  const userToPageMap = client.userToPageMap;
  await getAllUsers(client.events).then((res) =>
    res.map((user) => userToPageMap.set(user.userId, user))
  );
  return userToPageMap;
};

const objectifyName = (arr = []) => {
  return arr.map((item) => {
    return { name: item };
  });
};

const objectifyIds = (arr = []) => {
  console.log(arr);
  return arr.map((item) => {
    return { id: item };
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

const updateUserSavedEvents = async (
  { userId, userData, eventPageId },
  userToPageMap
) => {
  const savedEvents = [...userData.savedEvents, eventPageId];

  await notion.pages
    .update({
      page_id: userData.pageId,
      properties: {
        "Saved Events": {
          relation: objectifyIds(savedEvents),
        },
      },
    })
    .then((res) => {
      console.log("Prev", userToPageMap);
      userToPageMap.set(userId, { ...userData, savedEvents });
      console.log("After", userToPageMap);
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
