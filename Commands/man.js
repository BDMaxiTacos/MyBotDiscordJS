const { Message, MessageEmbed } = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

const man = async ({ message, params }) => {
  const COMMAND_FOLDER = "./Commands/";
  const searchedCommand = params[0].trim();

  fs.readdir(COMMAND_FOLDER, (err, files) => {
    if (err) return console.error(err);

    const commandFile = files.find(
      (file) => file.toLowerCase() === `${searchedCommand.toLowerCase()}.js`
    );
    const findedCommand = require(`./${commandFile}`);

    const messageEmbed = new MessageEmbed()
      .setColor(config.color)
      .setTitle(`Manuel de la commande ${findedCommand.name.toUpperCase()}`)
      .addFields(
        {
          name: "Nom",
          value: findedCommand.name,
        },
        {
          name: "Description",
          value: findedCommand.description,
        },
        {
          name: "Utilisation",
          value: `${config.prefix}${findedCommand.name} ${
            findedCommand.params || ""
          }`,
        }
      );
    return message.channel.send({ embeds: [messageEmbed] });
  });
};

module.exports = {
  name: "man",
  run: man,
  description:
    "Vous utilisez cette commande sans savoir ce que c'est ???? Cléopâtre vous indique à quoi sert la commande",
  params: "<command>",
};
