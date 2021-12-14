const { Client, Intents } = require('discord.js');
const Discord = require('discord.js')
// Importing this allows you to access the environment variables of the running node process
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = process.env.PREFIX

client.once('ready', () => {
    console.log('Squelch is online');
    client.user.setActivity('USERS', {type:'WATCHING'})
})

client.on('messageCreate', async message => {
    if(message.channel.type === 'dm' || message.author.bot) return;

    const logChannel = client.channels.cache.find(channel => channel.id === '920418900930330664')
    let words = ["banana", "orange"]

    let foundInText = false;
    for (var i in words) {
        if (message.content.toLowerCase().includes(words[i].toLowerCase())) foundInText = true
    }

    if (foundInText) {
        let logEmbed = new Discord.MessageEmbed()
        .setDescription(`${message.author} Said a bad word`)
        .addField('The message:', message.content)
        .setColor('RANDOM')
        .setTimestamp()
        logChannel.send({embeds: [logEmbed]})

        let embed = new Discord.MessageEmbed()
        .setDescription(`That word is not allowed here`)
        .setColor('RANDOM')
        .setTimestamp()
        let msg = await message.channel.send(embed);
        message.delete()
        msg.delete({timeout: '15500'})
    }

})


client.login(process.env.CLIENT_TOKEN);
