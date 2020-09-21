const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {



    let embed = new Discord.RichEmbed()
    .setDescription("Здесь ничего нет")
    .setColor(Math.floor(Math.random()*16777215))
    message.channel.send(embed)




}


module.exports.help = {
  name:"store",
  aliases: ["st"]
}