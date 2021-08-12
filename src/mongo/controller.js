const User = require("./user");

const createUser = async ({
  userId,
  username,
  pageId,
  eventTypes,
  eventTopics,
}) => {
  const user = new User({
    userId: userId,
    pageId: pageId,
    username: username,
    eventTypes: eventTypes,
    eventTopics: eventTopics,
  });

  await user.save().catch(console.log);
};

const updateUserPreferences = async ({ userId, eventTypes, eventTopics }) => {
  await User.findOneAndUpdate(
    { userId: userId },
    {
      eventTypes: eventTypes,
      eventTopics: eventTopics,
    },
    { new: true }
  );
};

const updateUserSavedEvents = async ({ userId, savedEvents }) => {
  await User.findOneAndUpdate(
    { userId: userId },
    {
      savedEvents: savedEvents,
    },
    { new: true }
  );
};

const getUserByUserId = async (userId) => {
  return User.findOne({ userId: userId });
};

const getAllUsers = async () => {
  return User.find();
};

module.exports = {
  createUser,
  getUserByUserId,
  getAllUsers,
  updateUserPreferences,
  updateUserSavedEvents,
};
