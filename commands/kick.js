const Discord = require('discord.js');
const customisation = require('../customisation.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('Пожалуйста пинганите того кого хотите пингануть.').catch(console.error);
  if (user.id === message.author.id) return message.reply("Я не могу позволить тебе сделать это, вредить себе вредно  :facepalm:");
  if (user.id === client.user.id) return message.reply("Ты хотел меня кикнуть?:joy:");
  
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** Вы не имеете право: **Kick Members**");
  
  if (message.mentions.users.first().id === "242263403001937920") return message.reply("Вы не можете кикнуть моего создателя!:wink:");
  if (reason.length < 1) reason = 'Нет причины';

  if (!message.guild.member(user).kickable) return message.reply('Я не могу его кикнуть');
  message.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setColor(0x0000FF)
    .setTimestamp()
    .addField('Действие:', 'Кик')
    .addField('Юзер:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Модератор:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Причина', reason)
  let logchannel = message.guild.channels.find('имя', 'logs');
  if  (!logchannel){
    message.channel.send(`:white_check_mark: Получилось! Я кикнула токсичного ребенка!`)
  }else{
    message.channel.send(`:white_check_mark: Получилось! Я написала все в <#${logchannel.id}>.`)
    client.channels.get("713446593436844043").send({embed});
  }
  if(user.bot) return;
  return message.mentions.users.first().send({embed}).catch(e =>{
    if(e) return
  });
};

module.exports.help = {
  name:"kick",
  aliases: [""]
}