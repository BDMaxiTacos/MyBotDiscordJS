//ENVOIE MESSAGE DE BIENVENUE ET ASSIGNE UN ROLE
const { Permissions } = require('discord.js');

const memberRole = (guildMember) => {
    var role = guildMember.guild.roles.cache.find((r) => r.name === 'Membre');
    
    if(guildMember.guild.roles.cache.find((r) => r.name === 'Membre') == null){
        guildMember.guild.roles.create({
            name: "Membre",
            color: "RED",
            reason: "Rôle de base",
            permissions: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL]
        }).then(role => guildMember.roles.add(role))
    }
    else{
        guildMember.roles.add(role);
    }
    

    if(guildMember.guild.channels.cache.find(channel => channel.name === 'bienvenue') == null){
        let category = guildMember.guild.channels.cache.find(c => c.name == "Salons textuels" && c.type == "GUILD_CATEGORY");
        
        //CREATION CANAL
        let channel = guildMember.guild.channels.create('bienvenue', {
            type: 'GUILD_TEXT',
            permissionOverwrites: [{
                parent: "Salons textuels",
                id: guildMember.guild.id,
                allow: ['VIEW_CHANNEL'],
                deny: ['SEND_MESSAGES'],
	        }]
        });

        channel.then((channelObj) => {
            channelObj.setParent(category.id);
            channelObj.send(`Bienvenue ${guildMember} !`);
        });

    }
    else{
        const welcomeChannel = guildMember.guild.channels.cache.find(channel => channel.name === 'bienvenue');
        welcomeChannel.send(`Bienvenue ${guildMember} !`);
    }
}

module.exports = memberRole;
// module.exports = {name : 'memberRole', run: memberRole};