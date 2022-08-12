const {
  MessageEmbed,
  Message,
  WebhookClient,
  MessageAttachment,
} = require("discord.js");
module.exports = {
  name: "messageCreate",
  /**
   * @param {Message} message
   */
  async execute(message) {
    if (message.channelId === "1007700985931644998" && !message.author.bot) {
      const Response = new MessageEmbed()
        .setColor("GOLD")
        .setAuthor({
          name: message.author.tag,
          iconURL: message.author.avatarURL({ dynamic: true }),
        })
        .setDescription(`${message.content}`)
        .setFooter({ text: new Date().toLocaleDateString() })
        .addFields({
          name: "ZAREAGUJ BY OCENIĆ TEMAT",
          value: `✅ / ❌`,
          inline: true,
        });
      const SubjectManager = new WebhookClient({
        url: "https://discord.com/api/webhooks/1007691983969583104/v62vvCzdI95ewLtOKwfI9xWp96C3vu_iy3ygkZ4_EbasaTXlO-avsj3kpFxQIN9PnBJ0",
      });
      SubjectManager.send({
        embeds: [Response],
      }).catch((err) => {
        console.log(err);
      });
      message.delete();
    }
  },
};
