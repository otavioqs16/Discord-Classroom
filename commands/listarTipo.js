const Discord = require('discord.js')
const mongo = require('../mongo')
const activitieSchema = require('../activities-schema')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Listar as atividades relacionadas a um tipo de atividade',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<tipo atividade>',
    callback: async ({message, args}) => {
        [tipoAtividade] = args
        var atividades = []
        const embed = new Discord.MessageEmbed()
        return await mongo().then(async mongoose => {
            try{
                const atividade = await activitieSchema.find({tipoAtividade})
                console.log('TIPO ENCONTRADO:', atividade)
                if(atividade.length <= 0){
                    embed.setTitle('ATIVIDADE NÃO ENCONTRADA')
                    embed.setDescription(`**Tipo de atividade:** ${tipoAtividade}`)
                    embed.setColor('#ffec5c')
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.addField('Dica:', 'Utilize ``/listarTiposAtividade`` para checar os tipos de atividades existentes.')
                    return embed;
                }
                for(const i in atividade){
                    atividades.push(atividade[i].desc)
                }
                console.log('ATIVIDADES:', atividades)
                embed.setTitle(tipoAtividade)
                embed.setDescription(atividades)
                embed.setThumbnail('https://image.freepik.com/free-vector/education-test-icon-set_108855-1414.jpg')
                embed.setColor('#006e68')
                embed.addField('Dica:', 'Utilize ``/infoAtividade`` para checar as informações de uma atividade especifica.')

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