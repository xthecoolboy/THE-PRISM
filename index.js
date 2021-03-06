const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const { Client } = require('pg');
const config = require('./config');

try {

	function getConfig() {
		let testing;
		try {
			const keys = require('./keys.json')
			const token = keys.token;
			const dbURL = keys.database.url
			const prefix = config.testPrefix;
			testing = true
			console.log('Starting using locally stored value for token.');
			return {'token': token, 'prefix': prefix, 'dbURL': dbURL, 'testing': testing}
		}
		catch(error) {
			const token = process.env.TOKEN;
			const dbURL = process.env.DATABASE_URL
			const prefix = config.prefix;
			testing = false
			console.log('Starting using token stored on Heroku');
			return {'token': token, 'prefix': prefix, 'dbURL': dbURL, 'testing': testing}
		}
	}
	const cfg = getConfig();

	class BotClient extends AkairoClient {
		constructor() {
			super({
				ownerID: config.owner.id,
			}, {
				disableEveryone: true,
				allowMention: true,
			});

			this.commandHandler = new CommandHandler(
				this,
				{
					directory: './commands/',
					prefix: cfg['prefix']
				}
			);
			this.inhibitorHandler = new InhibitorHandler(this, {
				directory: './inhibitors/'
			});

			this.listenerHandler = new ListenerHandler(this, {
				directory: './listeners/'
			});

			this.commandHandler.useListenerHandler(this.listenerHandler);
			this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
			
			this.listenerHandler.setEmitters({
				commandHandler: this.commandHandler,
				inhibitorHandler: this.inhibitorHandler,
				listenerHandler: this.listenerHandler
			});
			
			this.commandHandler.loadAll();
			this.inhibitorHandler.loadAll();
			this.listenerHandler.loadAll();	
		}
	}
	const client = new BotClient();
	
	client.db = new Client({
		connectionString: cfg['dbURL'],
		ssl: {
			rejectUnauthorized: false
		}
	});
	client.db.connect();
	client.testing = cfg['testing']
	client.on('raw', async packet => { 
 		if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
		const channel = await client.channels.fetch(packet.d.channel_id);
		if (channel.messages.cache.has(packet.d.message_id)) return;
		channel.messages.fetch(packet.d.message_id).then(message => {
			const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
			const reaction = message.reactions.cache.get(emoji);
			if (reaction) reaction.users.cache.set(packet.d.user_id, client.users.fetch(packet.d.user_id));
			if (packet.t === 'MESSAGE_REACTION_ADD') {
				client.emit('messageReactionAdd', reaction, client.users.fetch(packet.d.user_id));
			}
			if (packet.t === 'MESSAGE_REACTION_REMOVE') {
				client.emit('messageReactionRemove', reaction, client.users.fetch(packet.d.user_id));
			}
		});
	});
	client.login(cfg['token']);
} catch(e) {

	console.log(e)
}