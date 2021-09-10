const Discord = require('discord.js')
const mongo = require('../mongo')
const notaSchema = require('../notas-schema')
const activitiesSchema = require('../activities-schema')

module.exports = {
    description: 'Listar notas dos alunos em determinada atividade',
    minArgs: 2,
    syntaxError: 'Comando inválido! Use `{PREFIX}`listarNotaAtividade {ARGUMENTS}',
    expectedArgs: '<tipo atividade> <desc>',
    callback: async ({message, args}) => {
        console.log('ARGS: ', args)
        const invalido = new Discord.MessageEmbed()
        const clone = [ ...args]
        var repository = []
        var notas = []
        var tipoAtividade
        var split
        var desc
        return await mongo().then(async mongoose => {
            try{
                console.log('Checando se atividade existe no BD')
                for(const i in clone){
                    console.log('ARG ATUAL: ', clone[i])
                    repository.push(clone[i])
                    console.log('REPOSITÓRIO: ', repository)
                    tipoAtividade = repository.join(' ')
                    console.log('TIPO ATIVIDADE ATUAL: ', tipoAtividade)
                    const result = await notaSchema.find({tipoAtividade})
                    console.log('TIPO ATIVIDADE ENCONTRADO: ', result)
                    if(result.length > 0){
                        split = clone.slice(i)
                        split = split.slice(1)
                        desc = split.join(' ')
                        console.log('DESC: ', desc)
                        const descAtividade = await notaSchema.find({desc})
                        console.log('DESC ATIVIDADE: ', descAtividade)
                        break;
                    }
                    console.log('REPOSITÓRIO ATUAL: ', repository)
                }
                
                const atividadeEncontrada = await notaSchema.find({tipoAtividade, desc})
                console.log('ATIVIDADE ENCONTRADA: ', atividadeEncontrada)
                if(atividadeEncontrada.length <= 0){
                    invalido.setTitle('ATIVIDADE NÃO ENCONTRADA')
                    invalido.setDescription(`**Tipo de atividade:** ${tipoAtividade} \n**Descrição:** ${desc}`)
                    invalido.setColor('#ffec5c')
                    invalido.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    invalido.addField('Dica:', 'Utilize ``/listarTiposAtividade`` para checar os tipos de atividades existentes.')
                    message.reply(invalido)
                    return
                }
                
                for(const i in atividadeEncontrada){
                    const atividade = await activitiesSchema.find({desc})
                    for(const j in atividade){
                        console.log(`
                        tipoAtividade: ${atividade[j].tipoAtividade}
                        desc: ${atividade[j].desc}
                        link: ${atividade[j].link}
                        nota: ${atividade[j].nota}
                        `)
                        notas.push(atividade[j].nota) 
                    }
                    const receivedEmbed = message.embeds[0]
                    const embed = new Discord.MessageEmbed(receivedEmbed)
                    .setTitle(atividadeEncontrada[i].tipoAtividade)
                    embed.setThumbnail('https://www.csvp.com.br/wp-content/uploads/2018/05/icone-prova.png')
                    embed.setColor('#2ba61e')
                    embed.setDescription(atividadeEncontrada[i].desc)
                    embed.addField('Nome', atividadeEncontrada[i].nome)
                    embed.addField('Nota', atividadeEncontrada[i].nota + ' / ' + notas[i])
                    if((atividadeEncontrada[i].nota * 100) / notas[i] >= 80){
                        embed.setColor('#2ba61e')
                    }else if((atividadeEncontrada[i].nota * 100) / notas[i] >= 60 & (atividadeEncontrada[i].nota * 100) / notas[i] <= 80){
                        embed.setColor('#0076ba')
                    }else{
                        embed.setColor('#9e0000')
                    }
                    embed.setFooter('Percentual atingido: ' + Math.round((atividadeEncontrada[i].nota * 100) / notas[i]) + '%')
                    
                    message.reply(embed)
                }
            }finally{
                mongoose.connection.close()
            }

        })

    }


}