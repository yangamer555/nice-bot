const db = require("quick.db")
const Discord = require("discord.js");
const customisation = require('../customisation.json');

exports.run = async (bot, message, args) => {
    const lol = 250
    db.subtract(`money_${message.guild.id}_${message.author.id}`, lol)
    let Ответ = [
    'Квартира',
    'Ничего',
    'Ничего'
    ];

    let result = Math.floor((Math.random() * Ответ.length));
    

    let embed = new Discord.RichEmbed()
    .setTitle(`Рулетка.`)
    .setColor("#AA9900")
    .addField("Выигриш:", Ответ[result])

    message.channel.send({embed});
}
module.exports.help = {
  name:"roulette2  ",
  aliases: [""]
}