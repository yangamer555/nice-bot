const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("Выберите себе жертву");
    if (message.mentions.users.first().id === message.author.id) return message.channel.send('Но это невозможно...:facepalm:');
    if (message.author.id !== '427876788438433792') return message.reply('Низя');
    const { body } = await superagent
    .get("https://nekos.life/api/kiss");
    
    const embed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle(`OwO, ${message.author.username} поцеловал(а) ${message.mentions.users.first().username}`)
    .setImage(body.url);
    message.channel.send({embed})
};

module.exports.help = {
    name:"kiss",
    aliases: ["kiss"]
}