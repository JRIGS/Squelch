// import { curseWords } from "./cursewords.cjs"
const { Client, Intents, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js')
// Importing this allows you to access the environment variables of the running node process
require('dotenv').config();

const curseWords = require('./cursewords')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = process.env.PREFIX

client.once('ready', () => {
    console.log('Squelch is online');
    client.user.setActivity('USERS', {type:'WATCHING'})
})

client.on('messageCreate', async message => {
    if(message.channel.type === 'dm' || message.author.bot) return;

    const logChannel = client.channels.cache.find(channel => channel.id === '920418900930330664')
    let words = curseWords

    let foundInText = false;
    for (var i in words) {
        if (message.content.toLowerCase().includes(words[i].toLowerCase())) foundInText = true
    }

    if (foundInText) {
        let logEmbed = new Discord.MessageEmbed()
        .setDescription(`${message.author} Said a bad word`)
        .addField('The message:', message.content)
        .addField('Channel', message.guild.channels.cache.get(message.channel.id).toString())
        .setColor('RANDOM')
        .setTimestamp()
        logChannel.send({embeds: [logEmbed]})
        message.delete()
    }


})


client.login(process.env.CLIENT_TOKEN);
