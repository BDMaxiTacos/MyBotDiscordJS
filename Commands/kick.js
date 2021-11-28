const kick = ({ message }) => {
    let mentionMember = message.mentions.members.first();
    let authorHighestRole = message.member.roles.highest.position;
    let mentionHighestRole = message.mentions.members.first().roles.highest.position;
    const args = message.content.trim().split(/ +/);
    const reason = args.slice(2).join(' ');

    //Permissions des membres
    if(message.member.permissions.has('KICK_MEMBERS') == false) {
        message.channel.send('Tu nas pas les permissions pour faire cela');
        return;
    }

    //Personne à bannir
    else if(mentionMember == null) {
        message.channel.send('Mettre le nom de la personne à bannir');
        return;
    }

    //Rôles
    else if(mentionHighestRole >= authorHighestRole) {
        message.channel.send('Tu ne peux pas bannir une personne qui à le même rôle ou un rôle plus élevé que toi');
        return;
    }

    //Permissions du bot
    else if(mentionMember.kickable == null) {
        message.channel.send('Je nai pas les permissions pour bannir');
        return
    }

    //Réussi
    mentionMember.kick({reason : `${reason}`})
        if(reason != ''){
            message.channel.send(`Kick ${mentionMember} . Raison : ` + reason);
        }
        else{
            message.channel.send(`Kick ${mentionMember}`);
        }
}

module.exports = {
    name : 'kick', 
    run: kick, 
    description: 'Cléopâtre expulse du serveur la personne de votre choix, celle-ci peut quand même revenir',
    params: '@user <reason>'
};