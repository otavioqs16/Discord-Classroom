const Discord = require('discord.js')
const mongo = require('../mongo')
const activitieSchema = require('../activities-schema')

module.exports = {
    description: 'Listar atividades',
    minArgs: 1,
    syntaxError: 'Comando inválido! Use `{PREFIX}`listarAtividades {ARGUMENTS}',
    expectedArgs: '<tipo atividade>',
    callback: async ({message, args}) =>{
        const embed = new Discord.MessageEmbed()
        const tipoAtividade = args.join(' ')
        console.log('TIPO ATIVIDADE: ', tipoAtividade)
        return await mongo().then(async mongoose => {
            try{
                const atividade = await activitieSchema.find({tipoAtividade})
                if(atividade.length <= 0){
                    embed.setTitle('ATIVIDADE NÃO ENCONTRADA')
                    embed.setDescription(`**Tipo de atividade:** ${tipoAtividade}`)
                    embed.setColor('#ffec5c')
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.addField('Dica:', 'Utilize ``/listarTiposAtividade`` para checar os tipos de atividades existentes.')
                    message.reply(embed)
                }
                for(const i in atividade){
                    console.log(`
                    tipoAtividade: ${atividade[i].tipoAtividade}
                    desc: ${atividade[i].desc}
                    link: ${atividade[i].link}
                    nota: ${atividade[i].nota}
                    `)

                    const receivedEmbed = message.embeds[0]
                    const embed = new Discord.MessageEmbed(receivedEmbed)
                    .setTitle(atividade[i].tipoAtividade)
                    embed.setThumbnail('https://image.freepik.com/free-vector/education-test-icon-set_108855-1414.jpg')
                    embed.setDescription(atividade[i].desc)
                    embed.setColor('#6100e0')
                    embed.addField('Link ', atividade[i].link)
                    embed.addField('Nota ', atividade[i].nota)
                    embed.setFooter('Data de entrega: ' + atividade[i].data + ' - ' + atividade[i].hora + 'hs')

                    message.reply(embed)
                    
                }
                
            }finally{
                mongoose.connection.close()
            }
        })
       
    }
}