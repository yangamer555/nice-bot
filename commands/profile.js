const moment = require('moment');
const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");
const customisation = require('../customisation.json');
function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " Дней" : " Дней") + " прошло";
};
exports.run = async (client, msg, args) => {
  let user = msg.mentions.users.first();
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  if(!warns[user.id]) warns[user.id] = {
      warns: 0
    };
  let muser = msg.guild.member(msg.mentions.users.first());
    if (!muser) muser = msg.member;
    if(!user) user = msg.author;
  const embed = new Discord.RichEmbed();
  embed.addField("Ник", `${user.username}#${user.discriminator}`, true)
          .addField("Айди", `${user.id}`, true)
          .setColor(3447003)
          .setThumbnail(`${user.avatarURL}`)
          .setTimestamp()
          .setURL(`${user.avatarURL}`)
          .addField('Статус', `${muser.presence.status.toUpperCase()}`, true)
          .addField('Игра', `${muser.presence.game === null ? "Не указана" : muser.presence.game.name}`, true)
          .addField('Зарегистрировался в дискорде', `${moment(user.createdAt).toString().substr(0, 15)}\n(${moment(user.createdAt).fromNow()})`, true)
          .addField('Зашел на сервер', `${moment(muser.joinedAt).toString().substr(0, 15)}\n(${moment(muser.joinedAt).fromNow()})`, true)
          .addField('Роли', `${muser.roles.array()}`, true)
          .addField('Бот или нет', `${user.bot.toString().toUpperCase()}`, true)
          .addField('Варны:', warns[`${user.id}, ${msg.guild.id}`].warns)
      msg.channel.send({embed});
}
module.exports.help = {
  name:"profile",
  aliases: ["profile"]
}