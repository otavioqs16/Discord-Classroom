const Discord = require('discord.js');

module.exports = {
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: "<Marque o @ de um usuário>",
    callback: async({message, args, client}) => {
        const embed = new Discord.MessageEmbed()
        
        if(!message.mentions.users.first()){
            embed.setColor('Blue')
            embed.setTitle(`Avatar de ${message.author.username}`)
            embed.setImage(message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
            embed.setFooter(`Autor: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setTimestamp()
            return message.channel.send(embed)
        }else{
            const user = message.mentions.users.first();
            embed.setColor('Blue')
            embed.setTitle(`Avatar de ${user.username}`)
            embed.setImage(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
            embed.setFooter(`Autor: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setTimestamp()
            return message.channel.send(embed)
        }
    }
}