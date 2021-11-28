function ban({ message, params }) {
  const user = message.mentions.users.first();
  if (!user) {
    message.channel.send("Vous devez mentionner quelqu'un à bannir");
    return;
  }

  const tabreason = params.splice(1);
  const reason = tabreason.join(" ")
    ? tabreason.join(" ")
    : "Bannissement mérité";

  const member = message.guild.members.resolve(user);

  if (member) {
    member
      .ban({
        reason: reason,
      })
      .then(() => {
        // We let the message author know we were able to ban the person
        message.channel.send(`Ban réussi sur le membre ${user}`);
      })
      .catch((err) => {
        // An error happened
        // This is generally due to the bot not being able to ban the member,
        // either due to missing permissions or role hierarchy
        message.channel.send("Impossible de ban ce membre!");
        // Log the error
        console.error(err);
      });
  } else {
    message.channel.send("No member found");
  }
}

module.exports = {
  name: "ban",
  run: ban,
  description:
    "Cléopâtre bannis un utilisateur, celui-ci ne peut plus rejoindre",
  params: "@user <?reason>",
};
