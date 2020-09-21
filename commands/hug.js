const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("Выберите себе жертву");
    const { body } = await superagent
    .get("https://nekos.life/api/hug");
    
    const embed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTitle(`OwO, ${message.author.username} обнял(а) ${message.mentions.users.first().username}`)
    .setImage(body.url);
    message.channel.send({embed})
};

module.exports.help = {
  name:"hug",
  aliases: ["hug"]
}