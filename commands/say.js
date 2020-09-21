exports.run = (client, message) => {
    let args = message.content.split(" ").slice(1);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌**Error:** Вы не имеет право: **Administator** ")
    message.delete();
    message.delete();
    message.channel.send(args.join(" "));
};

 module.exports.help = {
    name:"say",
    aliases: ["say"]
  }