const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {

  let ownerID = '427876788438433792'
  if(message.author.id !== ownerID) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.subtract(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setDescription(`Удалено ${args[1]} коинов \n\nНовый баланс: ${bal}`);
    message.channel.send(moneyEmbed)

};


module.exports.help = {
  name:"remove",
  aliases: ["rm"]
}
