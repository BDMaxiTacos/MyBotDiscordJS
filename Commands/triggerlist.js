const { MessageEmbed } = require("discord.js");
const { getTrigger } = require("../Controllers/TriggerController");
const config = require("../config.json");

const triggerlist = async ({ message }) => {
  const triggers = await getTrigger();
  if (!triggers) return;
  if (triggers.length === 0)
    return message.channel.send("Vous n'avez pas encore créé de trigger !!!");

  const messageEmbed = new MessageEmbed()
    .setColor(config.color)
    .setTitle("Trigger list")
    .setDescription(
      triggers.map((trigger) => `**Trigger :** ${trigger.trigger}\n`).join("")
    );
  return message.channel.send({ embeds: [messageEmbed] });
};

module.exports = {
  name: "triggerlist",
  run: triggerlist,
  description: "Cléopâtre indique les messages auxquels elle vous répondra",
};
