const { getTriggerByTrigger } = require("../Controllers/TriggerController");

const inspecttrigger = async ({ message, params }) => {
  const trigger = params.join(" ");

  if (!trigger)
    return message.channel.send(
      "Vous n'avez pas renseigné le trigger a inspecter"
    );

  try {
    const inspectedTrigger = await getTriggerByTrigger(trigger);
    return message.channel.send(
      `Le trigger **${trigger}** renvoi **${inspectedTrigger.response}**`
    );
  } catch (err) {
    console.error(err);
    return message.channel.send(`Le trigger **${trigger}** n'existe pas...`);
  }
};

module.exports = {
  name: "inspecttrigger",
  run: inspecttrigger,
  description:
    "Vous ne vous rappelez pas de ce que Cléopâtre doit vous répondre ? Utilisez cette commande",
  params: "<trigger>",
};
