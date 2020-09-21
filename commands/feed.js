const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("Вы должны пингануть юзера перед тем как его покормить XDDD");
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/feed");
    
    const embed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTitle(`OwO, ${message.mentions.users.first().username}, вы были покормленны юзером ${message.author.username}`)
    .setImage(body.url) 
    message.channel.send({embed})
};

module.exports.help = {
  name:"feed",
  aliases: ["feed"]
}