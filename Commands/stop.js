const {GuildMember, MessageEmbed} = require('discord.js');
const config = require("../config.json");
const {player} = require("../index.js");
const voice = require('@discordjs/voice')

async function stopmusic({ message }) {
    if (!(message.member instanceof GuildMember) || !message.member.voice.channel) {
        return void message.reply({
            content: 'Vous n\'êtes pas connecté à un channel vocal!',
            ephemeral: true,
        });
    }

    if (message.guild.me.voice.channelId &&
        message.member.voice.channelId !== message.guild.me.voice.channelId) {
        return void message.reply({
            content: 'Vous n\'êtes pas dans le même channel vocal que moi!',
            ephemeral: true,
        });
    }


    const queue = player.getQueue(message.guildId);
    if (!queue && !queue.playing){
        const messageEmbedStopping = new MessageEmbed()
            .setColor(config.color)
            .setTitle('❌ | Aucune musique n\'est jouée!');
        return message.channel.send({ embeds: [messageEmbedStopping] });
    }
    queue.destroy();

    const messageEmbedStopped = new MessageEmbed()
        .setColor(config.color)
        .setTitle('🛑 | Musique arrêtée!');
    return message.channel.send({ embeds: [messageEmbedStopped] });
}

module.exports = { name: "stop", run: stopmusic, description: 'Vous ne voulez plus de musique ? Cléopâtre arrête' };