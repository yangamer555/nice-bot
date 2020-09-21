const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");
//const mysql = require('mysql');
//const file = require('../mysql.json');
const customisation = require('../customisation.json');

exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  //let logchannel = message.guild.channels.find('name', 'logs');
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** Вы не имеет право: **Kick Members** ");
  if (message.mentions.users.size < 1) return message.reply('Пинганите пользователя которого хотите заварнить.').catch(console.error);
  if (message.mentions.users.first().id === message.author.id) return message.reply('Варнить себя? Плохо:facepalm:');
  if (message.mentions.users.first().id === "242263403001937920") return message.reply("Вы не можете заварнить моего создателя:wink:");
  //if (!logchannel) return message.channel.send('I cannot find a logs channel');
  if (reason.length < 1) reason = 'No reason supplied.';
  
  if(!warns[`${user.id}, ${message.guild.id}`]) warns[`${user.id}, ${message.guild.id}`] = {
    warns: 0
  };

  warns[`${user.id}, ${message.guild.id}`].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
    if(err) throw err;
  });

  const embed = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random()*16777215))
  .setTimestamp()
  .addField('Действие:', 'Warning')
  .addField('Юзер:', `${user.username}#${user.discriminator}`)
  .addField('Заварнен модератором:', `${message.author.username}#${message.author.discriminator}`)
  .addField('Номер варна:', warns[`${user.id}, ${message.guild.id}`].warns)
  .addField('Причина', reason)
  let logchannel = message.guild.channels.find('name', 'logs');
  if  (!logchannel){
    message.channel.send({embed})
  }else{
    client.channels.get(logchannel.id).send({embed});
    message.channel.send({embed})
  }
  if(user.bot) return;
  message.mentions.users.first().send({embed}).catch(e =>{
    if(e) return 
  });


  if(warns[`${user.id}, ${message.guild.id}`].warns == 2){
    let muteRole = message.guild.roles.find('name', 'Muted')

    let mutetime = "60s";
    message.guild.members.get(user.id).addRole(muteRole.id);
    message.reply(`${user.tag} был замучен`);

    setTimeout(function(){
      message.guild.members.get(user.id).removeRole(muteRole.id)
    }, ms(mutetime))
  }

  if(warns[`${user.id}, ${message.guild.id}`].warns == 3){
    message.guild.member(user).kick(reason);
    message.reply('Был кикнут :facepalm:')
  }

  if(warns[`${user.id}, ${message.guild.id}`].warns == 5){
    message.guild.member(user).ban(reason);
    message.reply('Вы больше не должны беспокоиться об этой дерьмовой голове, я его забанила!');
  }

};

module.exports.help = {
  name:"warn",
  aliases: ["warn"]
}