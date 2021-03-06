const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {


  let user = message.author;
  let timeout = 604800000;
  let amount = 500;

  let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

  if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));
  
    let timeEmbed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random()*16777215))
    .setDescription(`Вы уже получили свою еженедельную награду\n\nЗаберите награду через ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .setDescription(`Вы получили свою еженедельную награду в размере ${amount} коинов`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"weekly",
  aliases: ["week"]
}