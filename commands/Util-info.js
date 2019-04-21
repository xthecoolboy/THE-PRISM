const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const moment = require('moment')
const color = require('../colors.json')
const packageFile = require('../package.json')

class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info']
        })
    }

    exec(message) {

        let createdDate = new moment(this.client.user.createdAt)

        let infoEmbed = new Discord.RichEmbed()

            .setTitle(`\'${this.client.user.username}\' information.`)
            .setColor(color.purple)
            .setFooter(`by ${packageFile.author}`)
            .setThumbnail(this.client.user.avatarURL)
            .addField('Version', packageFile.version, true)
            .addField('Server count', this.client.guilds.size, true)
            .addField('Created on', createdDate.format('DD MMM YYYY hh:mm A'), true)
    
        message.channel.send(infoEmbed);
    }
}

module.exports = InfoCommand;