const { Listener } = require('discord-akairo');

class AutoResponderListener extends Listener {
    constructor() {
        super('autoResponder', {
            emitter: 'client',
            eventName: 'message'

        })
    }

    async exec(message) {

        if(!message.guild) return;
        if(message.guild.id !== '447504770719154192') return;
        if(message.author.bot) return;

        //AutoMod
        if(/(discord.gg\/)/.test(message.content) || /(discordapp.com\/invite\/)/.test(message.content)) {
            if(!message.author.permissions.has('MANAGE_SERVER')) message.delete()
        }



        if(/^gn$/gi.test(message.content) || /^goodnight$/gi.test(message.content) || /^night$/gi.test(message.content)) {
            
            let responses = ['Sleep well', 'Goodnight', 'Sweet dreams', 'Don\'t let the bed bugs bite', 'Night']
            let i = Math.floor(Math.random()*responses.length)

            message.channel.send(`${responses[i]}, ${message.author}`)

        }

        if(/^gm$/gi.test(message.content) || /^goodmorning$/gi.test(message.content) || /^morning$/gi.test(message.content)) {
            
            let responses = ['Morning', 'Goodmorning', 'Rise and shine']
            let i = Math.floor(Math.random()*responses.length)

            message.channel.send(`${responses[i]}, ${message.author}`)

        }

        //Prism meme ones
        {
            if(/booo*ty/gi.test(message.content.split(" ").join(""))) message.react('535581424435200010')
            if(/^helll*oo*o$/i.test(message.content)) message.react('453964150385672203')
            if(/brian/i.test(message.content)) message.react('453928256371032064')
        }

        //Normal stuff
        {
            if(/^no u$/i.test(message.content)) message.reply('no u')
            if(/^ok/i.test(message.content)) message.react('👌')
            if(/^no$/i.test(message.content)) message.react('🚫')
            if(/^yes$/i.test(message.content)) message.react('✅')
            if(/bruh/i.test(message.content)) message.react('623624603675394048')
            if(/\<3/i.test(message.content)) message.react('♥️')
        }


        //Emoji face reactions
        {
            if(/\w*\;\)\w*/i.test(message.content)) message.react('😉')
            if(/\:\)/i.test(message.content)) message.react('🙂')
            if(/\:\(/i.test(message.content)) message.react('🙁')
            if(/hmm/i.test(message.content)) message.react('448143170509733899') 
        }

        //Bad Words
        {
            if(/nigg/i.test(message.content)) {
                if(message.guild.ownerID === message.author.id) {
                    console.log("Jacob has the N pass")
                } else {
                    message.channel.send(`${message.member} is a racist!`)
                    message.delete()
                }
            }
        }


    }
}

module.exports = AutoResponderListener;