async function clear({ message, params }) {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(
      "Impossible d'utiliser la commande, il faut la permission `manage_messages`"
    );
  if (!isNaN(params[0])) {
    let amount = 0;
    if (params[0] === "1" || params[0] === "0") {
      amount = 1;
    } else {
      amount = params[0];
      if (amount > 100) {
        amount = 100;
      }
    }

    amount >= 100
      ? await message.delete() /* only 100 messages bulk possible */
      : amount++;

    await message.channel.bulkDelete(amount, true).then((_message) => {
      message.channel
        .send(`Le bot a supprimé \`${_message.size}\` messages :broom:`)
        .then((sent) => {
          setTimeout(function () {
            sent.delete();
          }, 2500);
        });
    });
  }
}

module.exports = {
  name: "clear",
  run: clear,
  description: "Cléopâtre supprime le nombre de messages indiqués",
  params: "<nbOfMessage>",
};
