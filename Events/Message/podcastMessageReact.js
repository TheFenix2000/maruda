const { Message } = require("discord.js");
module.exports = {
  name: "messageCreate",
  /**
   * @param {Message} message
   */
  async execute(message) {
    if (message.channelId === "1007700985931644998" && message.author.bot) {
      message.react(`✅`);
      message.react(`❌`);
    }
  },
};
