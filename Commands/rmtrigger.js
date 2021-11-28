const { removeTrigger } = require("../Controllers/TriggerController");

const rmtrigger = async ({ message, params }) => {
  const triggerMessage = params[0]?.trim();

  if (!triggerMessage)
    return message.channel.send(
      `Vous n'avez pas indiqué le trigger a supprimer`
    );

  try {
    const removedTrigger = await removeTrigger(triggerMessage);

    if (+removedTrigger.n <= 0)
      return message.channel.send("Aucun trigger correspondant n'a été trouvé");

    return message.channel.send(
      `Le trigger **${triggerMessage}** a été supprimé`
    );
  } catch (err) {
    console.error(err);
    return message.channel.send(`Le trigger n'a pu être supprimé...`);
  }
};

module.exports = {
  name: "rmtrigger",
  run: rmtrigger,
  description:
    "Cléopâtre supprime le trigger et n'intérragira plus avec vous sur ce message",
  params: "<trigger>",
};
