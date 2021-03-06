const { Listener } = require('discord-akairo');
const { colors, prism } = require('../../config');
const { rgb } = require('../../functions');

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd',
            channel: 'guild'
        })
    }
    
    async exec(member) {

        const guild = member.guild;
        const log = await this.client.channels.fetch(prism.guild.channelIDs.log);
        
        if(guild.id !== prism.guild.id) return;

        await log.send({embed: {
            
            type: 'rich',
            title: null,
            description: `**${member} joined the server**`,
            url: null,
            color: rgb(colors.good),
            fields: [],
            timestamp: new Date(),
            tumbnail: null,
            image: null,
            video: null,
            author: {
                name: member.user.tag,
                icon_url: member.user.avatarURL()
                },
            provider: null,
            footer: {
            text: `ID: ${member.user.id}`
            }

        }})
    }
}

module.exports = GuildMemberAddListener;