const Discord = require('discord.js')
const activitieSchema = require ('../activities-schema')
const mongo = require('../mongo')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Informação de uma atividade específica',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<tipo atividade> <desc>',
    callback: async ({message, args}) => {
        [tipoAtividade, desc] = args
        console.log('TIPO ATIVIDADE: ', tipoAtividade)
        console.log('DESC: ', desc)
        const embed = new Discord.MessageEmbed()
        return await mongo().then(async mongoose => {
            try{
                const atividade = await activitieSchema.find({tipoAtividade, desc})
                console.log('ATIVIDADE ENCONTRADA:', atividade)
                if(atividade.length <= 0){
                    embed.setTitle('ATIVIDADE NÃO ENCONTRADA')
                    embed.setDescription(`**Tipo de atividade:** ${tipoAtividade} \n**Descrição:** ${desc}`)
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.setColor('#ffec5c')
                    embed.addField('Dica:', 'Utilize ``/listarTipo <tipo atividade>`` para checar as atividades relacionadas a este tipo de atividade.')
                    return embed;
                }
                embed.setTitle(atividade[0].tipoAtividade)
                embed.setDescription(atividade[0].desc)
                embed.setThumbnail('https://image.freepik.com/free-vector/education-test-icon-set_108855-1414.jpg')
                embed.setColor('#6100e0')
                embed.addField('Link ', atividade[0].link)
                embed.addField('Nota ', atividade[0].nota)
                embed.setFooter('Data de entrega: ' + atividade[0].data + ' - ' + atividade[0].hora + 'hs')

                if(message) {
                    message.reply('', {embed})
                }
            
                return embed;

            }finally{
                mongoose.connection.close()
            }
        })
    }
}