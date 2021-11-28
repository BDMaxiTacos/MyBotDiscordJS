const { GuildMember, MessageEmbed } = require("discord.js");
const config = require("../config.json");
const { client, player } = require("../index.js");

async function skipMusic({ message }) {


  if (!(message.member instanceof GuildMember) || !message.member.voice.channel) {
    return message.reply({
      content: 'Vous n\'êtes pas connecté à un channel vocal!',
      ephemeral: true,
    });
  }

  if (message.guild.me.voice.channelId &&
      message.member.voice.channelId !== message.guild.me.voice.channelId) {
    return message.reply({
      content: 'Vous n\'êtes pas dans le même channel vocal que moi!',
      ephemeral: true,
    });
  }

  if(client.voice.adapters.size === 0) {
    return message.reply({
      content: 'Le bot n\'est pas connecté à un channel vocal!',
      ephemeral: true,
    });
  }

  const queue = player.getQueue(message.guildId);
  if (!queue && !queue.playing){
    const messageEmbedNoMusic = new MessageEmbed()
        .setColor(config.color)
        .setTitle('❌ | Aucune musique en cours de lecture!');
    return message.channel.send({ embeds: [messageEmbedNoMusic] });
  }
  const currentTrack = queue.current;
  const success = queue.skip();

  const messageEmbedSkipped = new MessageEmbed()
      .setColor(config.color)
      .setTitle(success ? `✅ | Musique passée **${currentTrack}**!` : '❌ | Quelque chose s\'est mal passé !');
  return message.channel.send({ embeds: [messageEmbedSkipped] });

}

module.exports = { name: "skip", run: skipMusic, description: 'Cléopâtre change de musique à tous moments'};
