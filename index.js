const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const db = require("quick.db")

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      bot.aliases.set(alias, props.help.name);
  
  });
});
})
const lol = bot.users.size
const activities_list = [
    "$help", 
    "Слежу за тобой",
    "By ЯЖЕГУСЬ",
    "$help"
    //`${lol}`
    ];
bot.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        bot.user.setActivity(activities_list[index], {
            type: "STREAMING",
            url: "https://www.twitch.tv/hiroaki_haruto"
          });
    }, 5000);
});

  bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let prefix = botconfig.prefix
    let messageArray = message.content.split(" ");
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile;

    if (bot.commands.has(cmd)) {
      commandfile = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    commandfile = bot.commands.get(bot.aliases.get(cmd));
  }
  
      if (!message.content.startsWith(prefix)) return;

          
  try {
    commandfile.run(bot, message, args);
  
  } catch (e) {
  }}
  )

bot.on("message", async message => {
  db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
  let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)

  let messages;
  if (messagefetch == 25) messages = 25; //Level 1
  else if (messagefetch == 65) messages = 65; // Level 2
  else if (messagefetch == 115) messages = 115; // Level 3
  else if (messagefetch == 200) messages = 200; // Level 4
  else if (messagefetch == 300) messages = 300; // Level 5
  else if (messagefetch == 400) messages = 400;
  else if (messagefetch == 500) messages = 500;
  else if (messagefetch == 600) messages = 600;
  else if (messagefetch == 700) messages = 700;
  else if (messagefetch == 800) messages = 800;
   else if (messagefetch == 900) messages = 900;
   else if (messagefetch == 1000) messages = 1000;
   else if (messagefetch == 1100) messages = 1100;
   else if (messagefetch == 1200) messages = 1200;
   else if (messagefetch == 1300) messages = 1300;
   else if (messagefetch == 1400) messages = 1400;
  
  

  if (!isNaN(messages)) {
    db.add(`level_${message.guild.id}_${message.author.id}`, 1)
    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)
    
  let levelembed = new Discord.RichEmbed()
  .setDescription(`${message.author}, Вы повысили уровень! Тепер у вас ${levelfetch} уровень`)
   message.channel.send(levelembed)
  }
})

bot.login(process.env.token);
