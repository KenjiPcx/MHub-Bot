const createMsg = () => {
  return {
    color: 0x0099ff,
    title: "Subscribe to our bot to get weekly updates (Part2)",
    description: `Please tell us more about your interests.
           `,
    fields: [
      {
        name: `\u200b`,
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
