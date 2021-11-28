const unmute = ({ message }) => {
  if (!message.member.permissions.has("MANAGE_ROLES"))
    return message.channel.send("Vous ne pouvez pas utiliser cette commande.");

  const member = message.mentions.members.first();

  if (!member)
    return message.channel.send(
      "Vous avez oublié d'indiquer la personne que vous voulez demute."
    );
  const role = message.guild.roles.cache.find((r) => r.name == "Mute");
  member.roles.remove(role);
  return message.channel.send(`${member} a été demute`);
};

module.exports = {
  name: "unmute",
  run: unmute,
  description: "Cléopâtre redonne la parole à cette personne.",
  params: "@user",
};
