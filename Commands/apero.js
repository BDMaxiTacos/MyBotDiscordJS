const apero = ({ message }) => {
  var date = new Date();
  var hrs = date.getHours();

  if (hrs >= 11 && hrs <= 13) {
    return message.channel.send("Apéro time !");
  } else if (hrs >= 18 && hrs <= 21) {
    return message.channel.send("Apéro time !");
  } else {
    return message.channel.send("Ce n'est pas encore l'heure de l'apéro !");
  }
};
module.exports = {
  name: "apero",
  run: apero,
  description: "Cléopâtre vous indique s'il est l'heure de l'apéro",
};
