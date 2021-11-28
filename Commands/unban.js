function unban({ message, params }) {
  const unbanId = params[0];
  if (!unbanId) {
    return message.channel.send("Il faut mettre un id après la commande");
  }

  let userID = unbanId;
  message.guild.bans.fetch().then((bans) => {
    if (bans.size == 0) {
      return message.channel.send(
        "Aucun utilisateur dans la liste des banissements"
      );
    }
    let bUser = bans.find((b) => b.user.id == userID);
    if (!bUser) {
      return message.channel.send(
        "Aucun utilisateur trouvé avec l'id: <!@" + unbanId + ">"
      );
    }
    message.guild.members
      .unban(bUser.user)
      .then((r) =>
        message.channel.send(`Cet utilisateur a été débanni: ${bUser.user}`)
      );
  });
}

module.exports = {
  name: "unban",
  run: unban,
  description: "Cléopâtre débanni l'utilisateur en question",
  params: "<banID>",
};
