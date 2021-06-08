const Discord = require('discord.js')
const mongo = require('../mongo')
const activitieSchema = require('../activities-schema')

module.exports = {
    description: 'Listar atividades',
    minArgs: 1,
    maxArgs: 1,
    syntaxError: 'Comando inválido! Use `{PREFIX}`listarAtividades {ARGUMENTS}',
    expectedArgs: '<tipo atividade>',
    callback: async ({message, args}) =>{
        const [tipoAtividade] = args;
        console.log(tipoAtividade)
        return await mongo().then(async mongoose => {
            try{
                console.log('Running findOne()')
    
                const results = await activitieSchema.find({tipoAtividade})
                if(results.length <= 0){
                    message.reply('Esse tipo de atividade não existe!')
                }
                for(const i in results){
                    console.log(`index: ${i}
                    tipoAtividade: ${results[i].tipoAtividade}
                    desc: ${results[i].desc}
                    link: ${results[i].link}
                    nota: ${results[i].nota}
                    `)

                    const receivedEmbed = message.embeds[0]
                    const embed = new Discord.MessageEmbed(receivedEmbed)
                    .setTitle(results[i].tipoAtividade)
                    embed.setThumbnail('https://www.csvp.com.br/wp-content/uploads/2018/05/icone-prova.png')
                    embed.setDescription(results[i].desc)
                    embed.setColor('#6100e0')
                    embed.addField('Link ', results[i].link)
                    embed.addField('Nota ', results[i].nota)
                    embed.setFooter('Data de entrega: ' + results[i].data + ' - ' + results[i].hora + 'hs')

                    message.reply(embed)
                    
                }
                
            }finally{
                mongoose.connection.close()
            }
        })
       
    }
}