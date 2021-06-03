console.log(`Loading...`)

const Discord = require(`discord.js`)
const fs = require(`fs`)

const config = JSON.parse(fs.readFileSync(`config.json`, `utf8`))

const client = new Discord.Client()

client.on(`ready` , () => {
    console.log(`Bot Logged in as ` + client.user.tag + `!`)
    console.log(`The bot is on ` + client.guilds.cache.size + ` servers!`)
})

client.snipe = new Discord.Collection()
client.on("messageDelete", deletedMsg => {
    client.snipe.set(deletedMsg.channel.id.deletedMsg)
})

client.on("message", message => {
    if (message.content === "embed") {
        let embed = new Discord.MessageEmbed()
        .setTitle("This is Embed Title")
        .setDescription("This is Embed description")
        .setColor("RANDOM")
        .setFooter("This is Embed Footer");
    }
})

client.on(`message` , (message) =>{
    const args = message.content.split(" ").slice(1)
    if(!message.member.user.bot && message.guild){
        if(message.content == `!Test`){
            message.channel.send(`Test!`)
            console.log(message.member.user.tag + ` executed Command !test!`)
        }
    }
    if(message.content.startsWith("!kick")) {
        if(message.member.hasPermission("KICK_MEMBER")) {
            let member = message.mentions.members.first()
            if(!member) message.channel.send("Please mention someone")
            else {
                member.kick().then(mem => {
                    message.channel.send(`Kicked ${mem.user.username}!`)
                })
            }
        } else {
            message.reply("You don´t have permission to do that!")
        }
    }
    if(message.content.startsWith("!ban")) {
        if(message.member.hasPermission("BAN_MEMBER")) {
            let member = message.mentions.members.first()
            if(!member) message.channel.send("Please mention someone")
            else {
                member.ban().then(mem => {
                    message.channel.send(`Baned ${mem.user.username}!`)
                })
            }
        } else {
            message.reply("You don´t have permission to do that!")
        }
    }
    if(message.content.startsWith("!snipe")) {
        let channel = message.mentions.channels.first() || message.channel
        let msg = client.snipe.get(channel.id)
        if(!msg) return message.channel.send("There is nothing to snipe!")
        let embed = new Discord.MessageEmbed()
        .setTitle(msg.author.tag)
        .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
        .setColor("RANDOM")
        .setDescription(msg.content)
        if(msg.attachments.first()) embed.setImage(msg.attachments.first().url)
        message.channel.send(embed)
    }
    if(message.content.startsWith("!clear")) {
        let amountToPurge = args[0]
        if(isNaN(amountToPurge)) return message.channel.send("Must provide a integar")
        message.delete()
        message.channel.bulkDelete(amountToPurge)
        message.channel.send(`Deleted ${amountToPurge} messages!`).then(v =>
        v.delete({timeout: 1500}))
    }
     if(message.content.startsWith("!mute")) {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don´t have permission to do that!")
        let role = message.guild.roles.cache.find(role => role.name === "muted")
        let member = message.mentions.members.first()
        let reason = message.content.split(" ").slice(2).join(" ")
        if(!reason) reason = "No reason specified!"
        if(!role) return message.channel.send("You didn´t mention a member!")
        if(member.roles.cache.has(role.id)) return message.channel.send("That user is already muted!")
        member.roles.add(role)
        .then(() => {
            message.channel.send(`Sucessfully muted ${member} with reason: ${reason}`)
        })
        .catch(() => {
            message.channel.send("Oops, something went wrong!")
        })
        }
        if(message.content.startsWith("!unmute")) {
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don´t have permission to do that!")
            let role = message.guild.roles.cache.find(role => role.name === "muted")
            let member = message.mentions.members.first()
            let reason = message.content.split(" ").slice(2).join(" ")
            if(!reason) reason = "No reason specified!"
            if(!role) return message.channel.send("You didn´t mention a member!")
            if(!member.roles.cache.has(role.id)) return message.channel.send("That user is not muted!")
            member.roles.remove(role)
            .then(() => {
                message.channel.send(`Sucessfully unmuted ${member} with reason: ${reason}`)
            })
            .catch(() => {
                message.channel.send("Oops, something went wrong!")
            })
        }
        
    });

client.login(config.token)