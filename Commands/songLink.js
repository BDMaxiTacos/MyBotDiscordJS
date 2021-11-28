const fetch = require("cross-fetch");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

async function songLink({ message, params }) {
  const vidurl = encodeURIComponent(params[0]);
  const url = "https://api.song.link/v1-alpha.1/links?url=" + vidurl;
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    console.error(error);
  }
  const data = JSON.parse(await response.text()); //JSON.parse(response.text())

  let messageEmbedLinks = new MessageEmbed()
    .setColor(config.color)
    // .setTitle("Trigger list")
    .setTitle(`Liens SongLink`);

  // return console.log(data);

  if (!data.linksByPlatform)
    return message.channel.send("Il n'y a pas de liens Songlink");

  let desc = "";

  if (data.linksByPlatform.spotify) {
    desc += `Spotify:\nPays: ${data.linksByPlatform.spotify.country}\nLien: ${data.linksByPlatform.spotify.url}`;
  }
  if (data.linksByPlatform.itunes) {
    desc += `\n\nItunes:\nPays: ${data.linksByPlatform.itunes.country}\nLien: ${data.linksByPlatform.itunes.url}`;
  }
  if (data.linksByPlatform.appleMusic) {
    desc += `\n\nAppleMusic:\nPays: ${data.linksByPlatform.appleMusic.country}\nLien: ${data.linksByPlatform.appleMusic.url}`;
  }
  if (data.linksByPlatform.youtube) {
    desc += `\n\nYoutube:\nPays: ${data.linksByPlatform.youtube.country}\nLien: ${data.linksByPlatform.youtube.url}`;
  }
  if (data.linksByPlatform.youtubeMusic) {
    desc += `\n\nYoutubeMusic:\nPays: ${data.linksByPlatform.youtubeMusic.country}\nLien: ${data.linksByPlatform.youtubeMusic.url}`;
  }
  if (data.linksByPlatform.google) {
    desc += `\n\nGoogle:\nPays: ${data.linksByPlatform.google.country}\nLien: ${data.linksByPlatform.google.url}`;
  }
  if (data.linksByPlatform.googleStore) {
    desc += `\n\nGoogleStore:\nPays: ${data.linksByPlatform.googleStore.country}\nLien: ${data.linksByPlatform.googleStore.url}`;
  }
  if (data.linksByPlatform.pandora) {
    desc += `\n\nPandora:\nPays: ${data.linksByPlatform.pandora.country}\nLien: ${data.linksByPlatform.pandora.url}`;
  }
  if (data.linksByPlatform.deezer) {
    desc += `\n\nDeezer:\nPays: ${data.linksByPlatform.deezer.country}\nLien: ${data.linksByPlatform.deezer.url}`;
  }
  if (data.linksByPlatform.tidal) {
    desc += `\n\nTidal:\nPays: ${data.linksByPlatform.tidal.country}\nLien: ${data.linksByPlatform.tidal.url}`;
  }
  if (data.linksByPlatform.amazonStore) {
    desc += `\n\nAmazonStore:\nPays: ${data.linksByPlatform.amazonStore.country}\nLien: ${data.linksByPlatform.amazonStore.url}`;
  }
  if (data.linksByPlatform.amazonMusic) {
    desc += `\n\nAmazonMusic:\nPays: ${data.linksByPlatform.amazonMusic.country}\nLien: ${data.linksByPlatform.amazonMusic.url}`;
  }
  if (data.linksByPlatform.soundcloud) {
    desc += `\n\nSoundcloud:\nPays: ${data.linksByPlatform.soundcloud.country}\nLien: ${data.linksByPlatform.soundcloud.url}`;
  }
  if (data.linksByPlatform.napster) {
    desc += `\n\nNapster:\nPays: ${data.linksByPlatform.napster.country}\nLien: ${data.linksByPlatform.napster.url}`;
  }
  if (data.linksByPlatform.yandex) {
    desc += `\n\nYandex:\nPays: ${data.linksByPlatform.yandex.country}\nLien: ${data.linksByPlatform.yandex.url}`;
  }
  if (data.linksByPlatform.spinrilla) {
    desc += `\n\nSpinrilla:\nPays: ${data.linksByPlatform.spinrilla.country}\nLien: ${data.linksByPlatform.spinrilla.url}`;
  }
  if (data.linksByPlatform.audius) {
    desc += `\n\nAudius:\nPays: ${data.linksByPlatform.audius.country}\nLien: ${data.linksByPlatform.audius.url}`;
  }

  messageEmbedLinks.setDescription(desc);

  return message.channel.send({ embeds: [messageEmbedLinks] });
}

module.exports = {
  name: "songlink",
  run: songLink,
  description:
    "Vous permet de partager une musique avec vos amis, peut importe leur plateforme",
  params: "<musicUrl>"
};
