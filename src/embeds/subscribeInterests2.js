// Use this in on ready to post first time
// require("../embeds/subscribeInterests2").sendMsg(client, CONST.kROLES_CHANNEL_ID);

const sendMsg = (client, channelId) => {
  client.channels.cache
    .get(channelId)
    .send({
      embeds: [
        {
          color: 3447003,
          fields: [
            {
              name: "Subscribe to our bot to get weekly updates (Part2)",
              value: `
                Please select what kind of events would you like to get notified.

                Topics Discussed in Event

                :cut_of_meat: - Accounting
                :poultry_leg: - Social Enterprises
                :meat_on_bone: - Entrepreneurship
                :hotdog: - Policy and Governance
                :hamburger: - Technology
                :fries: - Engineering
                :spaghetti: - Education
                :ramen: - Leadership and Management
                :curry: - Economic, Business, Investment Banking Topics
                :bento: - Consulting
                :dumpling: - Financial Literacy
                :fried_shrimp: - Economics
                :rice_ball: - Career Progression or Related Pathways
                :rice: - Sustainability
                :fortune_cookie: - Law
                :oden: - Data Science
                :dango: - Personal Branding like Resume Workshops
                :white_check_mark: - Save
            `,
            },
          ],
        },
      ],
    })
    .catch(console.log);
};

module.exports = {
  sendMsg,
};
