const { MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Delete a specific number of messages from channel or target",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: "amount",
      description: "Select the amount of messages to delete.",
      type: "NUMBER",
      required: true,
    },
    {
      name: "target",
      description: "Select the target to clear their messages",
      type: "USER",
      required: false,
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { channel, options } = interaction;

    const amount = options.getNumber("amount");
    const target = options.getMember("target");

    const messages = await channel.messages.fetch();

    const Response = new MessageEmbed().setColor("DARK_VIVID_PINK");
    if (target) {
      let i = 0;
      const filltered = [];
      (await messages).filter((m) => {
        if (m.author.id === target.id && amount > i) {
          filltered.push(m);
          i++;
        }
      });

      await channel.bulkDelete(filltered, true).then((messages) => {
        Response.setDescription(
          `✅ Deleted ${messages.size} messages from ${target}`
        );
        interaction.reply({ embeds: [Response] });
      });
    } else {
      await channel.bulkDelete(amount, true).then((messages) => {
        Response.setDescription(
          `✅ Deleted ${messages.size} messages from this channel`
        );
        interaction.reply({ embeds: [Response] });
      });
    }
  },
};
