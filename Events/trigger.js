const { getTriggerByTrigger } = require("../Controllers/TriggerController");

const trigger = async (message) => {
  const trigger = await getTriggerByTrigger(message.content);

  if (trigger) return message.channel.send(trigger.response);
};

module.exports = { trigger };
