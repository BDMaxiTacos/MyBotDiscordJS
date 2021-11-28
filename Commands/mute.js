const { Permissions } = require("discord.js");
const ms = require("ms");
const unmute = require("./unmute");
const mute = ({ message, params }) => {
  if (!message.member.permissions.has("MANAGE_ROLES"))
    return message.channel.send("Vous ne pouvez pas utiliser cette commande.");

  const member = message.mentions.members.first();

  const { 1: time } = params;

  if (!member)
    return message.channel.send(
      "Vous avez oublié d'indiquer la personne que vous voulez mute."
    );

  const role = message.guild.roles.cache.find((r) => r.name == "Mute");
  member.roles.add(role);
  if (time)
    setTimeout(() => {
      unmute.run({ message });
    }, ms(time));
  return message.channel.send(
    `${member} a été mute ${time ? `pendant ${time}` : ""}`
  );
};

module.exports = {
  name: "mute",
  run: mute,
  description: "Cléopâtre fait taire quelqu'un qui parlerait trop !!",
  params: "@user <?time>",
};
