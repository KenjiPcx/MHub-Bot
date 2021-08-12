// Use this in on ready to post first time
// require("../embeds/subscribeInterests1").sendMsg(client, CONST.kROLES_CHANNEL_ID);

const sendMsg = (client, channelId) => {
  client.channels.cache
    .get(channelId)
    .send({
      embeds: [
        {
          color: 3447003,
          fields: [
            {
              name: "Subscribe to our bot to get weekly updates (Part1)",
              value: `
            Please select what kind of events would you like to get notified.
            
            React to this message with the corresponding emojis.
            You can click and unclick anytime to change your preferences.

            Type of Event

            :pick: - AIESEC Event
            :nut_and_bolt: - Webinar / Fourm
            :gear: - IG-Live
            :bricks: - Competitions
            :hook: - Recruitment (Student Organizations / Clubs / Societies)
            :magnet: - Fund-Raising
            :knot: - Social Enterprise Events
            :shield: - Hack-a-thons
            :crossed_swords: - Summit / Forum / Conference (Large scale event)
            :dagger: - Large Scale Event
            :knife: - Mentorship
            :carpentry_saw: - Startup Initiatives
            :firecracker: - Career Panels
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
