const move = ({ message, params }) => {
  let tochannel = params[0];
  const channel = message.member.voice.channel;
  for (const [memberID, member] of channel.members) {
    member.voice
      .setChannel(tochannel)
      .then(() => console.log(`${member.user.tag} a été déplacé.`))
      .catch(console.error);
  }
};

module.exports = {
  name: "move",
  run: move,
  description: "Cléopâtre déplace tous les membres vers un autre serveur vocal",
  params: "<idChannel>",
};
