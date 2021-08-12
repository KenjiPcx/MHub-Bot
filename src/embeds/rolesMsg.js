const createMsg = () => {
  return {
    color: 0x0099ff,
    title: "Choose Your Roles",
    description: `Please tell us more about your interests.
            React to this message with the emojis to join the respective channels.
            You can change these roles anytime.
            \u200b`,
    fields: [
      {
        name: "Year of Study",
        value: `
          :one: - First Year
          :two: - Second Year
          :three: - Third Year
          :four: - Fourth Year
          :student: - Graduate
          \u200b
        `,
      },
      {
        name: "Interests",
        value: `
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
            \u200b
          `,
      },
    ],
    timestamp: new Date(),
    footer: {
      text: "Malaysian Hub",
      icon_url:
        "https://lh3.googleusercontent.com/x8wsnfcrbcrcdMnAN6ji9lxWZzACyQbnl6j1ID61LhN8IDmlcBQP6JgtXQYq392dyR-VOMHXF7f3p70IT9xUwLB1c8rbWO7PtAUB_LhAnRvN751oP4irMFd-9HnHSoy8QYPzlzJc_xWAdoix-OTE826c07yyITGHDCAA45c-O8uiFmPQlSfROSACWFPSKRx35SUzbyMBIOrVKb_jhWGHe6aKzulR7-aMFXfihGWoF-RIi59l2eeFi-JeS9qISaZ-UxvwhHJKRjuj6zFBgYw8XPOj9OTcmiDzaOc57ePV0cqcGzgdSjJUzBR8GDtX3-CZhHPIBSo8dhesUoXd55-iSJB7KJcYVsoNGVhv1C8lLpuit7uHklT1X9XBXmo3lc_m3ynKWXTIAi4ENfEBDTG1kJv0KEN86h1qr8n4hoo-RPRfv1lTqRZ6rtS-xEu0LVxE9tJD75aMGLpsvoBRwQo-H5f3L7b5uBg2iXWR4Hg10CtzsmjFilui1lf1YbbzxrPVq4kbkSOY_VZc-MQg4ieJ72IuopsN5a191UfrGiGhRuPYCOxVYUxrJjVmJMMhTDsTrbMUGuxakD0Nk5Bao3XVCt-eGWniMGIJO_zp9UA5kRveO3GzNgM5xM2XvOLra7UQsdZnbvGzagyfDX01KGgxWfOKbUFvzMX28YKLYgGOyV7tORRCSDU9U-5MC75fBZlnsxnqdWoKy2YMK1gqId4Dl_o=w137-h132-no?authuser=0",
    },
  };
};

module.exports = {
  createMsg,
};
