const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {

  let user = message.mentions.members.first() 

  let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

  let embed1 = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .setDescription(`Упомяните кого-то чтобы передать деньги`);

  if (!user) {
      return message.channel.send(embed1)
  }
  let embed2 = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .setDescription(`SУкажите сумму для передачи денег`);
  
  if (!args[1]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .setDescription(`Вы не можете платить кому-то отрицательные деньги`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .setDescription(`Вы не имете такой суммы`);

  if (member < args[1]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .setDescription(`Вы передали ${user.user.username} ${args[1]} коинов`);

  message.channel.send(embed5)
  db.add(`money_${message.guild.id}_${user.id}`, args[1])
  db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])

}

module.exports.help = {
  name:"pay",
  aliases: [""]
}