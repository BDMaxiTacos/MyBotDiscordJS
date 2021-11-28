const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

const poll = ({ message, params }) => {
  const splitedParams = params.join(" ").split("|");
  const question = splitedParams[0];
  const responses = splitedParams.slice(1);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  if (!question)
    return message.channel.send("Vous n'avez pas mis de question !!!");

  if (responses.length >= 26)
    return message.channel.send("Vous pouvez mettre 26 réponses maximum !!!");

  if (!responses || responses.length === 0)
    return message.channel.send("Vous n'avez pas mis de réponses !!!");

  const messageEmbed = new MessageEmbed()
    .setColor(config.color)
    .setTitle(question)
    .setDescription(
      responses
        .map(
          (response, index) =>
            `:regional_indicator_${alphabet[index]}: ${response}\n`
        )
        .join("")
    );

  return message.channel.send({ embeds: [messageEmbed] }).then((message) => {
    {
      const UNICODE_regional_indicator_a = 127462;
      responses.forEach((_, index) => {
        message.react(
          String.fromCodePoint(UNICODE_regional_indicator_a + index)
        );
      });
    }
  });
};

module.exports = {
  name: "poll",
  run: poll,
  description:
    "Permet de lancer un sondage auprés de vos amis. Avec un maximum de 26 options",
  params: "<question> | <option1> | <option2> ...",
};
