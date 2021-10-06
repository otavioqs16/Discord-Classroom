const Discord = require('discord.js')
const aulas = require('../aulas')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Excluir uma aula do sistema',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<aula>',
    callback: async ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [aula] = args

        const delAula = await aulas.delAula(aula)
        console.log('DELETANDO AULA:', delAula)

        if(delAula === null){
            embed.setTitle('AULA NÃO ENCONTRADA')
            embed.setDescription(`**Aula:** ${aula}`)
            embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
            embed.setColor('#ffec5c')
            embed.addField('Dica:', 'Utilize ``/listarAulas`` para checar as aulas postadas.')
        }else{
            embed.setTitle('AULA EXCLUÍDA COM SUCESSO')
            embed.setThumbnail('https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png')
            embed.setColor("#d60000")
            embed.addField('Aula', delAula.aula)
            embed.addField('Tipo', delAula.tipo)
            embed.addField('Link', delAula.link)
            embed.addField('Data', delAula.data)
            embed.addField('Hora', delAula.hora)
        }

        if(message){
            message.reply('', {embed})
        }

        return embed;
    }
}