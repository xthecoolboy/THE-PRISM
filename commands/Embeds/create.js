const { Command } = require('discord-akairo');

class CreateEmbedCommand extends Command {
    constructor() {
        super('embed-create', {
            aliases: ['embed-create','embedcreate'],
            description: {
                content: 'Create a discord Embed, these embeds can be managed by people with the manage messages permission. They also must be able to speak in the channel they want to create the embed in.',
                usage: 'create <channel> <title> <description>'
            },
            userPermissions: 'MANAGE_MESSAGES',
            category: 'embeds',
            args: [
                {
                    id: 'channel',
                    type: 'channelMention'
                },
                {
                    id: 'title'
                },
                {
                    id: 'description',                    
                },
            ],
            split: 'quoted'
        })
    }

    async exec(message, args) {
try{
        
        let channel = args.channel

        if(!channel.permissionsFor(message.author).has('SEND_MESSAGES')) {
            return message.reply('You don\'t have permission to send messages here.')
        } else {

        try{

            let sent = await channel.send( {embed: {

                type: 'rich',
                title: args.title,
                description: args.description,
                url: null,
                color: null,
                fields: [],
                timestamp: null,
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: null,
                    icon_url: null
                    },
                provider: null,
                footer: null

            }})


            await message.reply(`Embed created, the link is: ${sent.url}`)
        } catch(error){console.log(error)}
        }

    }catch(e){console.log(e)}
    }
}

module.exports = CreateEmbedCommand
