const { notion } = require("./notion");

const databaseId = process.env.EVENTS_DATABASE_ID;

const getAllEvents = async () => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  try {
    return response.results
      .filter(
        (page) =>
          page.properties["End of Registration"] &&
          new Date(
            page.properties["End of Registration"].date.start
          ).getTime() > Date.now()
      )
      .map((page) => {
        return {
          pageId: page.id,
          eventName: page.properties.Name.title[0].text.content,
          pageURL: page.url,
          orgContact: page.properties["Org Contact"].rich_text[0].plain_text,
          posterURL: page.properties["Poster of Event"].url,
          registrationLink: page.properties["Registration Link"].url,
          registrationDeadline: page.properties["End of Registration"].date,
          eventField: page.properties[
            "Demographic of the event"
          ].multi_select.map((field) => field.name),
          eventTopics: page.properties["Topics Discussed"].multi_select.map(
            (field) => field.name
          ),
          eventType: page.properties["Type of Event"].multi_select.map(
            (field) => field.name
          ),
          sponsored: page.properties.Sponsored.checkbox,
        };
      });
  } catch (err) {
    console.log("Error in events");
    console.log(err);
    return [];
  }
};

const getEventPageById = (pageId) => {
  return notion.pages.retrieve({ page_id: pageId });
};

const getEventById = (pageId, eventArr) => {
  const filteredArr = eventArr.filter((event) => event.pageId === pageId);
  return filteredArr[0].eventName
};

module.exports = {
  getAllEvents,
  getEventById,
};
