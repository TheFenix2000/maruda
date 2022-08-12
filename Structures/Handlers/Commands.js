const { Perms } = require("../Validation/Permissions");
const { Client } = require("discord.js");

/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
  const Table = new Ascii("Commands Loaded");

  CommandsArray = [];
  (await PG(`${process.cwd().replace(/\\/g, "/")}/Commands/*/*.js`)).map(
    async (file) => {
      const command = require(file);

      if (!command.name)
        return Table.addRow(file.cplit("/")[7], "❌ FAILED", "Missing a name");

      if (!command.description)
        return Table.addRow(file.name, "❌ FAILED", "Missing a description");

      if (command.permission) {
        if (Perms.includes(command.permission))
          command.defaultPermission = false;
        else
          return Table.addRow(file.name, "🔴 FAILED", "Permission is invalid");
      }

      client.commands.set(command.name, command);
      CommandsArray.push(command);

      await Table.addRow(command.name, "🟢 SUCCESSFUL");
    }
  );

  console.log(Table.toString());

  // PERMISSION CHECK //

  client.on("ready", async () => {
    const mainGuild = await client.guilds.cache.get("578309921771094067");
    mainGuild.commands.set(CommandsArray);
  });
};
