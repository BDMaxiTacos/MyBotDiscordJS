const { default: fetch, Headers } = require("cross-fetch");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

const kFormatter = (num) => {
  if (!num) return null;
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

const topTrend = async ({ message }) => {
  const WOEID_PARIS = 615702;
  const url = `https://api.twitter.com/1.1/trends/place.json?id=${WOEID_PARIS}`;
  let response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: new Headers({
        authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
      }),
    });
  } catch (error) {
    console.error(error);
  }
  const data = await response.text();
  const trends = (await JSON.parse(data))[0].trends.slice(0, 10);

  const messageEmbed = new MessageEmbed()
    .setColor(config.color)
    .setTitle(":flag_fr:  Top 10 tendances Twitter ")
    .addFields(
      {
        name: "Tendance",
        value: trends.map((trend) => trend.name).join("\n"),
        inline: true,
      },
      {
        name: "Quantité",
        value: trends
          .map((trend) =>
            trend.tweet_volume
              ? `${kFormatter(trend.tweet_volume)} tweets`
              : "Moins de 10k tweets"
          )
          .join("\n"),
        inline: true,
      }
    );

  return message.channel.send({ embeds: [messageEmbed] });
};

module.exports = {
  name: "toptrend",
  run: topTrend,
  description: "Cléopâtre vous indique les sujets du moment twitter",
};
