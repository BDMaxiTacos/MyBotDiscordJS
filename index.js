require("dotenv").config();
const fs = require("fs");
const config = require("./config.json");
const { Intents, Client, Collection } = require("discord.js");
const mongoose = require("mongoose");
const memberRole = require("./Events/memberRole");
const { trigger } = require("./Events/trigger");
const { Player } = require("discord-player");

const PREFIX = config.prefix;
const COMMAND_FOLDER = "./Commands/";
let isDBConnected = false;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
client.commands = new Collection();

const player = new Player(client, {
  leaveOnEnd: false,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 5000,
  autoSelfDeaf: true,
  initialVolume: 80,
  bufferingTimeout: 3000,
});

player.on("error", (queue, error) => {
  console.log(`Erreur ${queue.guild.id} | ${error.message}`);
});

fs.readdir(COMMAND_FOLDER, (err, files) => {
  if (err) console.error(err);
  const commandFiles = files.filter((file) => file.endsWith(".js"));

  if (commandFiles.length <= 0) {
    console.error("No commands in this folder");
    return;
  }

  commandFiles.forEach((file) => {
    const props = require(`${COMMAND_FOLDER}${file}`);
    client.commands.set(props.name, props);
  });
});

mongoose.connect(
  `${config.database.server}/${config.database.name}`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    isDBConnected = !err;
    console.log(err || "Connexion à la base réussie !!!");
  }
);

client.once("ready", () => console.log("Bot ready !"));
client.once("reconnecting", () => console.log("Reconnected !"));
client.once("disconnect", () => console.log("Disconnected !"));

client.on("messageCreate", async (message) => {
  //Listen to send messages on the server
  if (isDBConnected) trigger(message);
  if (!message.content.startsWith(PREFIX)) return;
  if (message.author.bot) return;
  if (message.channel.type === "DM") return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const cmd = args[0].toLowerCase();

  if (!client.commands.has(cmd)) return;
  const commandFile = client.commands.get(cmd);
  try {
    commandFile.run({ message, command: cmd, params: args.splice(1) });
  } catch (err) {
    console.error(err);
  }
});

client.on("guildMemberAdd", memberRole);

client.login(process.env.DISCORD_TOKEN);

module.exports = { client, player };
