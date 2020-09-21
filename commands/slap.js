const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../customisation.json');

exports.run = async (client, message, args, tools) => {
    if (!message.mentions.users.first()) return message.reply("Выберите свою жервту :)Т");
    if(message.mentions.users.first().id === "691911205891080243") return message.reply('Зачем слапать меня?.:facepalm:');
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/slap");
    
    const embed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setTitle(`OwO, ${message.author.username} слапнул ${message.mentions.users.first().username}`)
    .setImage(body.url) 
    message.channel.send({embed})
};

  module.exports.help = {
    name:"slap",
    aliases: ["slap"]
  }