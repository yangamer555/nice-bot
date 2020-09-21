  
const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {

    let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)
    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)

    if(messagefetch == null) messagefetch = '0';
    if(levelfetch == null) levelfetch = '0';

    const embed = new Discord.RichEmbed()
    .setDescription(`${message.author}, Ваш уровень: \`${levelfetch}\`, было отправлено: \`${messagefetch}\` сообщений`)

    message.channel.send(embed)

}

module.exports.help = {
  name:"rank",
  aliases: ["rank"]
}