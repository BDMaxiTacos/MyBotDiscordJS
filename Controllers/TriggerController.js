const Trigger = require("../Models/TriggerSchema");

async function createTrigger(trigger) {
  try {
    const newTrigger = await Trigger.create(trigger);
    return newTrigger;
  } catch (err) {
    console.error(err);
  }
}

async function removeTrigger(message) {
  try {
    return await Trigger.deleteOne({ trigger: message });
  } catch (err) {
    console.error(err);
  }
}

async function getTrigger() {
  try {
    return await Trigger.find();
  } catch (err) {
    console.error(err);
  }
}

async function getTriggerByTrigger(trigger) {
  try {
    return await Trigger.findOne({ trigger });
  } catch (err) {
    console.error(err);
  }
}

async function updateTrigger(triggerName, updatedTrigger) {
  try {
    return await Trigger.updateOne({ trigger: triggerName }, updatedTrigger);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createTrigger,
  removeTrigger,
  getTrigger,
  getTriggerByTrigger,
  updateTrigger,
};
