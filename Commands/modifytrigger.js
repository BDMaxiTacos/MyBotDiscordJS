const { updateTrigger } = require("../Controllers/TriggerController");

const modifytrigger = async ({ message, params }) => {
  const { 0: triggerName, 1: newTriggerJSON } = params.join(" ").split(">");

  const { trigger, response } = JSON.parse(newTriggerJSON);
  const newTrigger = {};
  if (trigger) newTrigger.trigger = trigger;
  if (response) newTrigger.response = response;

  const updatedTrigger = await updateTrigger(triggerName.trim(), {
    $set: { ...newTrigger },
  });

  if (updatedTrigger)
    return message.channel.send(
      `Le trigger **${triggerName}** a été mis à jour !!!`
    );
};

module.exports = {
  name: "modifytrigger",
  run: modifytrigger,
  description: "Permet de modifier un trigger en lui passant un JSON",
  params:
    '<trigger> > {?"trigger": "new trigger", ?"response":  "new response"}',
};
