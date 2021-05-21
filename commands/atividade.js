const Discord = require('discord.js')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Testando slash commands',
    permissions: ["ADMINISTRATOR"],
    minArgs: 4,
    expectedArgs: '<tipo atividade> <descricao> <link> <nota>',
    callback: ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [tipo, desc, link, nota] = args;
        embed.setTitle(tipo)
        embed.setThumbnail('https://www.csvp.com.br/wp-content/uploads/2018/05/icone-prova.png')
        embed.setDescription(desc)
        embed.setColor('#6100e0')
        embed.addField('Link ', link)
        embed.addField('Nota ', nota)
        embed.setTimestamp()
        
        if(message) {
            message.reply('', {embed})
        }
        return embed;
    } 
}