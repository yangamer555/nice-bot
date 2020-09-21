const Discord = require('discord.js');
const customisation = require('../customisation.json');
exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if(message.mentions.users.first().id === "427876788438433792") return message.reply('Вы не можете замутить моего создателя!.:facepalm:')
  if(message.author.id === message.mentions.users.first()) return message.reply("Замутить себя? Неплохая идея, но не сегодня.:facepalm:");
  if (!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.reply("❌**Error:** Вы не имете разрешения:**Manage Roles**!");
  if (!muteRole) {
    try {
        muteRole = await message.guild.createRole({
            name:"Muted",
            color: "#000000",
            permissions:[]
        });

        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muteRole, {
                SEND_MESSAGES: false,
                MANAGE_MESSAGES: false,
                READ_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
    } catch(e) {
        console.log(e.stack);
    }
}
  if (reason.length < 1) reason = 'Нету причины';
  if (message.mentions.users.size < 1) return message.reply('Пинганите кого-то.').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00FFFF)
    .setTimestamp()
    .addField('Действие:', 'Mute')
    .addField('Юзер:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Модератор:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Причина', reason)
  message.channel.send({embed})

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply(':x: Я не имею некоторых прав..').catch(console.error);
  let logchannel = message.guild.channels.find('name', 'logs');
  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      if(!logchannel){
        return
      }else{
      client.channels.get(logchannel.id).send({embed}).catch(console.error);
      }
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {if(!logchannel){
      return
    }else{
    client.channels.get(logchannel.id).send({embed}).catch(console.error);
    }
    });
  }

};

module.exports.help = {
  name:"mute",
  aliases: ["mute"]
}