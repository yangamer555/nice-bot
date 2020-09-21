const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {

    const embed = new Discord.RichEmbed()
    .setDescription(`Топ по уровню: \`$lb levels\` | Топ по сообщениям: \`$lb messages\` | Топ по деньгам: \`$lb money\``)
    .setColor("#FFFFFF")


  if(!args[0]) return message.channel.send(embed)

    if (args[0] == 'levels') {
    let level = db.startsWith(`level_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < level.length; i++) {
        let user = bot.users.get(level[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${level[i].data}\n`
    
      }

    const embed = new Discord.RichEmbed()
    .setDescription(`**${message.guild.name}'s Топ по уровню**\n\n${content}`)
    .setColor(Math.floor(Math.random()*16777215))

    message.channel.send(embed)
  } else if(args[0] == 'messages') {
    let messages = db.startsWith(`messages_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < messages.length; i++) {
        let user = bot.users.get(messages[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${messages[i].data}\n`
    }

    const embed = new Discord.RichEmbed()
    .setDescription(`**${message.guild.name}'s Топ по сообщениям**\n\n${content}`)
    .setColor(Math.floor(Math.random()*16777215))

    message.channel.send(embed)
  }

    else if(args[0] == 'money') {
    let money = db.startsWith(`money_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < money.length; i++) {
        let user = bot.users.get(money[i].ID.split('_')[2]).username

      

        content += `${i+1}. ${user} ~ ${money[i].data}$\n`
    
      }

    const embed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name} - Топ!`)
    .setDescription(content)
    .setColor("#FFFFFF")

    message.channel.send(embed)
      

 
}

  }

module.exports.help = {
  name:"lb",
  aliases: ["lb"]
}