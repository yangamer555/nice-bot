const Discord  = require('discord.js');
const customisation = require('../customisation.json');
const integer = require('integer')

const agree    = "✅";
const disagree = "❎";

exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLE")) return message.reply("❌**Error:** Вы не имеет право: **Administator** ");
  if(!args || args[0] === 'help') return message.reply("Использование: vote <question>")
  // Number.isInteger(itime)
  //  if (e) return message.reply('please supply a valid time number in seconds')
  
  let msg = await message.channel.send(`Опрос: ${message.content.split(" ").splice(1).join(" ")} \nГолосуйте сейчас!`);
  await msg.react(agree);
  await msg.react(disagree);

  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: args[0]});
}

module.exports.help = {
  name:"vote",
  aliases: ["vote"]
}
