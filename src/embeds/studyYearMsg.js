const createMsg = () => {
  return {
    color: 3447003,
    fields: [
      {
        name: "Choose Your Roles",
        value: `
            Please tell us more about you so we can assign you to the right channel.
            
            React to this message with the corresponding emojis to get your roles.
            You can click and unclick anytime to change your roles.

            Year of Study

            :one: - First Year
            :two: - Second Year
            :three: - Third Year
            :four: - Fourth Year
            :student: - Graduate

            Field of Study

            :ledger: - Accounting & Finance
            :chart: - Business Management & Administration
            :briefcase: - Consultancy
            :art: - Arts & Design
            :film_frames:  - Audio & Media Production
            :computer: - Computing & IT
            :teacher: - Education
            :four_leaf_clover:  - Environmental Protection
            :scales: - Law
            :label: - Marketing & Sales

          `,
      },
    ],
  };
};

module.exports = {
  createMsg,
};
