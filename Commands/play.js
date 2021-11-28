const { GuildMember, MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");
const { player } = require("../index.js");
const config = require("../config.json");

async function playMusic({ message, params }) {
  message.options = params.join(" ");

  try {
    if (
      !(message.member instanceof GuildMember) ||
      !message.member.voice.channel
    ) {
      return void message.reply({
        content: "Vous n'êtes pas dans un channel vocal!",
        ephemeral: true,
      });
    }

    if (
      message.guild.me.voice.channelId &&
      message.member.voice.channelId !== message.guild.me.voice.channelId
    ) {
      return void message.reply({
        content: "Veuillez vous connecter à un channel vocal!",
        ephemeral: true,
      });
    }

    const query = message.options;
    const searchResult = await player
      .search(query, {
        requestedBy: message.user,
        searchEngine: QueryType.AUTO,
      })
      .catch(() => {});

    if (!searchResult || !searchResult.tracks.length)
      return message.channel.send("Pas de resultant!");

    const queue = await player.createQueue(message.guild, {
      ytdlOptions: {
        quality: "highest",
        filter: "audioonly",
        highWaterMark: 1 << 25,
        dlChunkSize: 0,
      },
      metadata: message.channel,
    });

    try {
      if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
      void player.deleteQueue(message.guildId);
      return message.channel.send("Impossible de rejoindre le channel vocal!");
    }

    const messageEmbedLoading = new MessageEmbed()
      .setColor(config.color)
      .setTitle(
        `⏱ | Chargement de votre ${
          searchResult.playlist ? "playlist" : "musique"
        }...`
      );

    await message.channel.send({
      embeds: [messageEmbedLoading],
    });
    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);
    if (!queue.playing) {
      await queue.play();

      const messageEmbedLoaded = new MessageEmbed()
        .setColor(config.color)
        // .setTitle("Trigger list")
        .setTitle(
          `✔️ | Chargement de votre vidéo '${searchResult.tracks[0].title}' réussi!`
        )
        .setImage(`${searchResult.tracks[0].thumbnail}`);

      await message.channel.send({ embeds: [messageEmbedLoaded] });
    }
  } catch (error) {
    console.log(error);
    return message.channel.send(
      "Une erreur a eu lieu en exécutant la commande: " + error.message
    );
  }
}

module.exports = {
  name: "play",
  run: playMusic,
  description:
    "Cléopâtre joue votre musique préféré dans votre channel vocal !",
  params: "<music or link>",
};
