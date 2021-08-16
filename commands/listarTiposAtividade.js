const Discord = require('discord.js')
const mongo = require('../mongo')
const activitieSchema = require('../activities-schema')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Listar todos os tipos de atividade',
    callback: async ({message}) => {
        var tipos = []
        var tiposUnico = []
        const embed = new Discord.MessageEmbed()
        return await mongo().then(async mongoose => {
            try{
                const atividades = await activitieSchema.find()
                console.log('ATIVIDADES:', atividades)
                for(const i in atividades){
                    tipos.push(atividades[i].tipoAtividade)
                    tiposUnico = [...new Set(tipos)]
                }
                console.log('TIPOS: ', tiposUnico)
                embed.setTitle('TIPOS DE ATIVIDADE')
                embed.setDescription(tiposUnico)
                embed.setThumbnail('https://image.freepik.com/free-vector/education-test-icon-set_108855-1414.jpg')
                embed.setColor('#006e68')
                
                if(message){
                    message.reply('', {embed})
                }

                return embed;
                

            }finally{
                mongoose.connection.close()
            }
        })
    }
}