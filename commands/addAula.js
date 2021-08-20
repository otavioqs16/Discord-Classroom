const Discord = require('discord.js')
const aulas = require('../aulas')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Adicionar nova aula',
    minArgs: 5, 
    maxArgs: 5,
    expectedArgs: '<aula> <tipo-aula> <link> <data> <hora>',
    callback: async ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [aula, tipo, link, data, hora] = args;
        embed.setTitle(aula)
        embed.setThumbnail('https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-teacher-education-presentation-school--flat-color-icon--vecto-png-image_1648907.jpg')
        embed.setDescription(`**Tipo: ** ${tipo}`)
        embed.setColor('#6100e0')
        embed.addField('Link ', link)
        embed.addField('Data ', data)
        embed.addField('Hora ', hora + ' hs')

        if(message){
            message.reply('', {embed})
        }

        const addLesson = await aulas.addAula(aula, tipo, link, data, hora)
        console.log('AULA ADICIONADA:', addLesson)

        return embed;
    }
}
