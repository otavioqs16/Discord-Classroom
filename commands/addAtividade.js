const Discord = require('discord.js')
const activity = require('../activities')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Adicionar nova atividade',
    minArgs: 6,
    maxArgs: 6,
    expectedArgs: '<tipo atividade> <descricao> <link> <nota> <data> <hora>',
    callback: async ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [tipo, desc, link, nota, data, hora] = args;
        embed.setTitle(tipo)
        embed.setThumbnail('https://image.freepik.com/free-vector/education-test-icon-set_108855-1414.jpg')
        embed.setDescription(desc)
        embed.setColor('#6100e0')
        embed.addField('Link ', link)
        embed.addField('Nota ', nota)
        embed.setFooter('Data de entrega: ' + data + " - " + hora + 'hs')
        
        if(message) {
            message.reply('', {embed})
        }

        const addAct = await activity.addActivity(tipo, desc, link, nota, data, hora)
        console.log('ATIVIDADE ADICIONADA:', addAct)

        return embed;
    } 

}