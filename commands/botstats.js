const Discord = require('discord.js')
const fs = require('fs');
const os = require('os');
const customisation = require('../customisation.json');
//const si = require('systeminformation');
const osutils = require('os-utils');
const db = require('quick.db')

exports.run = async (client, message) => {
  
  var milliseconds = parseInt((client.uptime % 1000) / 100),
        seconds = parseInt((client.uptime / 1000) % 60),
        minutes = parseInt((client.uptime / (1000 * 60)) % 60),
        hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
        days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);

        days = (days < 10) ? "0" + days : days;
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        fs.readdir('./commands/', async (err, files) => {
          if (err) console.error(err);
          totcmds = files.length;
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (!prefix) {
      prefix = '$'
    }
  osutils.cpuUsage(function(v) {
    const embed = new Discord.RichEmbed()
    .setColor(0x7289DA)
   .setTimestamp()
    .addField("Botstats", "Показывает статистику о боте.")
    .addField("--------------------------------------------------------------------------------","------------------------------------------------------------------------------")
    .addField("Префикс:", prefix, true)
    .addField("Всего каналов:", `${client.channels.size}`, true)
    .addField("Всего юзеров:", `${client.users.size}`, true)
    .addField("Всего команд:", `${totcmds} команд`, true)
    .addField("Версия бота:", "1.0.0 BETA", true)
    .addField("Библиотека", "Discord.js", true)
    .addField("Пинг", Math.round(client.ping) + "ms", true)
    .addField("Создатель", `${customisation.ownername}`, true)
        message.channel.send({embed});
  })
})
}

module.exports.help = {
    name:"botstats",
    aliases: ["botstats"]
  }
