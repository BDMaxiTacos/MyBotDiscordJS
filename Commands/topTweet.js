const { default: fetch, Headers } = require("cross-fetch");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

const tweet = async ({ message, params }) => {
  const hashtag = params[0];

  if (!hashtag)
    return message.channel.send(`❌ Vous n'avez pas renseigné le hashtag`);

  const url = `https://api.twitter.com/1.1/search/tweets.json?q=%23${hashtag}&result_type=popular`;

  let response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: new Headers({
        authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
  } catch (error) {
    console.log(error);
  }
  const data = await response.text();
  const tweets = await JSON.parse(data).statuses?.splice(0, 3);

  if (!tweets || tweets.length <= 0)
    return message.channel.send(`❌ Aucun tweet n'a été trouvé.`);

  const messageEmbed = new MessageEmbed()
    .setColor(config.color)
    .setTitle(`Top tweets ${hashtag}`)
    .addFields(
      tweets.map((tweet) => ({
        name: `${tweet.user.name} a dis : `,
        value: `${tweet.text}\n*${tweet.favorite_count} FAV - ${tweet.retweet_count} RT*`,
      }))
    );
  return message.channel.send({ embeds: [messageEmbed] });
};

module.exports = {
  name: "toptweet",
  run: tweet,
  description:
    "Cléopâtre vous indique les tweets les plus populaires via un hashtag",
  params: "<hashtag>",
};
