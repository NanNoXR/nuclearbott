module.exports = {
    name: `reactionrole`,
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = `848951301660475482`;
        const yellowTeamRole = message.guild.roles.cache.find(role => role.name === "User");

        const yellowTeamEmoji = `:674dfa4a5fed434390601fa6f6350e0a:`

        let embed = new Discord.MessageEmbed()
            .setColor(`#e42643`)
            .setTitle(`Get a rank`)
            .setDescription(`Please react with given reaction to get rank "User"!\n\n`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(yellowTeamEmoji);
            
    }
}