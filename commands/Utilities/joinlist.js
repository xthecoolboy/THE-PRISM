const { Command } = require('discord-akairo');
const { colors } = require('../../config');
const { rgb } = require('../../functions');

class JoinListCommand extends Command {
    constructor() {
        super('joinlist', {
            aliases: ['joinlist', 'join-list'],
            description: {
                content: 'Shows a list of members in order of their join dates.',
                usage: 'joinlist <page>'
            },
            args: [
                {
                    id: 'page',
                    type: 'string',
                    default: '1'
                }
            ],
            category: 'utilities'
        })
    }
    async exec(message, args) {
        try{
        const memberListWithBots = (await message.guild.members.fetch());
        const memberList = memberListWithBots.filter(b => !b.user.bot)
        const sortedMemberlist = memberList.sort((a, b) => b.joinedTimestamp - a.joinedTimestamp)


        let page = (args.page-1)*10
        let pageEnd = args.page*10

        let list = Array.from(sortedMemberlist.values()).map(m=>m.user.tag).reverse()

        let listPaged = list.slice(page, pageEnd)


            let footerText;

            if(list.length < pageEnd){
                footerText = `Page ${args.page} | ${page+1} - ${list.length} of ${list.length}`
            } else {
                footerText = `Page ${args.page} | ${page+1} - ${pageEnd} of ${list.length}`
            }

            message.channel.send({ embed: {

                type: 'rich',
                color: rgb(colors.purple),
                thumbnail: {
                    url: message.guild.iconURL()
                },
                fields: [
                    {
                        name: `${message.guild.name}'s join list`,
                        value: listPaged.map(m => `**${list.indexOf(m)+1}.** ${m}`)
                    }
                ],
                footer: {
                    text: footerText
                }

            }})
    }   catch(err) {
            message.reply('No more members to view.')
        }
        
    }
}

module.exports = JoinListCommand