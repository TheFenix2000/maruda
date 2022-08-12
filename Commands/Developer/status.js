const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
require("../../Events/Client/ready");

module.exports = {
  name: "status",
  description: "Displays the status of the client.",
  permission: `ADMINISTRATOR`,
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const Response = new MessageEmbed()
      .setColor("DARK_VIVID_PINK")
      .setDescription(
        `**Client**: \`🟢 ONLINE\` - \`${
          client.ws.ping
        }ms\`\n **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>`
      );
    interaction.reply({ embeds: [Response] });
  },
};
function switchTo(value) {
  var status = "";
  switch (value) {
    case 0:
      status = `🔴 DISCONNECTED`;
      break;
    case 1:
      status = `🟢 CONNECTED`;
      break;
    case 2:
      status = `🟡 CONNECTING`;
      break;
    case 3:
      status = `🟠 DISCONNECTING`;
      break;
    default:
      status = `⚫ ERROR`;
      break;
  }
  return status;
}
