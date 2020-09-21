const Discord = require('discord.js')
const db = require('quick.db')
const customisation = require('../customisation.json');

module.exports.run = async (bot, message, args) => {


    let embed = new Discord.RichEmbed()
    .setTitle("Nice Bot!")
    .addField("Экономические команды:", "`work`, `beg`, `rob [@user]`, `pay [@user] count`, `balance`, `withdraw [count]`, `deposit [count]`, `daily`, `weekly`, (еще будут дорабатыватся)")
    .addField("Игры для экономики:", "`roulette [color] [count]`, `slots [count]`")
    .addField("Инфо команды:", "`profile [@user]`, `serverinfo`, `botstats`")
    .addField("Игры:","`rps`")
    .addField("Реакции:","`feed`, `spank`, `slap`, `poke`, `pat`, `kiss` ")
    .addField("Остальное:","`say`, `vote`")
    .addField("Модерация:","`warn @user [reason]`, `mute [@user] [5m - 5минут и т.д.]`")
    .addField("Уровни:","`rank`, `lb`")
    .setFooter("Хотите такого же бота? Пишите в лс моему создателю! ЯЖЕГУСЬ")

    .setColor(Math.floor(Math.random()*16777215))
    message.channel.send(embed)




}

module.exports.help = {
  name:"help",
  aliases: [""]
}