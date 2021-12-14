const { Client, Intents } = require('discord.js');

// Importing this allows you to access the environment variables of the running node process
require('dotenv').config

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });



client.once('ready', () => {
    console.log('Squelch is online');
})



client.login(process.env.CLIENT_TOKEN);
