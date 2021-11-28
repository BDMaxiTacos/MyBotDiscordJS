const { createTrigger } = require("../Controllers/TriggerController");

const addtrigger = async ({ message, params }) => {
  const { 0: trigger, 1: response } = params.join(" ").split("=");

  if (!trigger) return message.channel.send("Vous avez oublié le trigger");
  if (!response) return message.channel.send("Vous avez oublié la reponse");

  try {
    const newTrigger = {
      trigger: trigger.trim(),
      response: response.trim(),
      created_at: new Date(),
      author: message.author,
    };
    const createdTrigger = await createTrigger(newTrigger);

    if (createdTrigger)
      return message.channel.send(
        `Le trigger a bien été créé **${createdTrigger.trigger}**`
      );
    return message.channel.send(`Le trigger existe déjà...`);
  } catch (err) {
    console.error(err);
    return message.channel.send(
      `Une erreur c'est produite lors de l'ajout du trigger...`
    );
  }
};

module.exports = {
  name: "addtrigger",
  run: addtrigger,
  description:
    "En ajoutant un trigger, vous permettez à Cléopâtre de réagir à certains messages",
  params: "<trigger> = <response>",
};
