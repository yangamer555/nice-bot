const Discord = require('discord.js');
const customisation = require('../customisation.json');

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " день" : " дней") + " назад";
};
exports.run = (client, message, args) => {
    let verifLevels = ["Нету", "Низкая", "Средне", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "brazil": "Бразилия",
        "eu-central": "Центральная Европа",
        "singapore": "Сингапур",
        "us-central": "США центральня",
        "sydney": "Сидней",
        "us-east": "U.S. East",
        "us-south": "U.S. South",
        "us-west": "U.S. West",
        "eu-west": "Western Europe",
        "vip-us-east": "VIP U.S. East",
        "london": "Лондон",
        "amsterdam": "Амсердам",
        "hongkong": "Хонг Конг",
        "russia": "Россия"
    };
    
    var emojis;
    if (message.guild.emojis.size === 0) {
        emojis = 'Нету';
    } else {
        emojis = message.guild.emojis.size;
    }

    const embed = new Discord.RichEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL ? message.guild.iconURL : client.user.displayAvatarURL)
  .setThumbnail(message.guild.iconURL)
  .setTimestamp()
  .addField("Создан", `${message.guild.createdAt.toString().substr(0, 15)},\n(${checkDays(message.guild.createdAt)})`, true)
  .addField("Айди", message.guild.id, true)
  .addField("Создатель", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
  .addField("Регион", region[message.guild.region], true)
  .addField("Всего пользователей", message.guild.memberCount, true)
  .addField("Юзеров", message.guild.members.filter(m => !m.user.bot).size, true)
  .addField("Кол-во ботов", message.guild.members.filter(m => m.user.bot).size, true)
  .addField("AFK Тайм-аут", message.guild.afkTimeout / 60 + ' minutes', true)
  .addField("Роли", message.guild.roles.size, true)
  .addField("Каналов", message.guild.channels.size, true)
  .addField("Эмодзи", `${emojis}/100`, true)
  .addField("Уровень верификация", verifLevels[message.guild.verificationLevel], true)
  .setColor(Math.floor(Math.random()*16777215))

  message.channel.send({embed});
}

module.exports.help = {
    name:"serverinfo",
    aliases: [""]
  }