const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 46599 });
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

client.commands = new Collection();

["Events", "Commands"].forEach((handler) => {
  require(`./Handlers/${handler}`)(client, PG, Ascii);
});
//env
client.login("OTI4MDQ3MTQzMjE2OTA2MjQw.G1F85A.boc6QFoxeqa4G_kMR4YsfgwOFfX0elPwlggSVI");
