const Discord = require('discord.js')
const mongo = require('../mongo')
const notaSchema = require('../notas-schema')
const alunoSchema = require('../aluno-schema')
const activitiesSchema = require('../activities-schema')

module.exports = {
    description: 'Listar notas de determinado aluno',
    minArgs: 1,
    syntaxError: 'Comando inválido! Use `{PREFIX}`listarNotas {ARGUMENTS}',
    expectedArgs: '<nome aluno>',
    callback: async ({message, args}) => {
        const nome = args.join(' ')
        console.log('NOME: ', nome)
        const invalido = new Discord.MessageEmbed()
        var desc
        var notas = []
        return await mongo().then(async mongoose => {
            try{
                console.log('Checando se o aluno exite no BD')
                const ifAluno = await alunoSchema.find({nome})
                console.log('ALUNO ENCONTRADO:', ifAluno)
                if(ifAluno <= 0){
                    invalido.setTitle('ALUNO NÃO CADASTRADO')
                    invalido.setDescription(`**Nome:** ${nome}`)
                    invalido.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    invalido.setColor('#ffec5c')
                    invalido.addField('Dica:', 'Utilize ``/listarAlunos`` para checar os alunos cadastrados.')
                    message.reply(invalido)
                    return
                }
                const aluno = await notaSchema.find({nome})
                console.log('NOTAS ALUNO: ', aluno)
                if(aluno.length <= 0){
                    invalido.setTitle('O ALUNO AINDA NÃO REALIZOU NENHUMA ATIVIDADE')
                    invalido.setDescription(`**Nome:** ${nome}`)
                    invalido.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    invalido.setColor('#ffec5c')
                    message.reply(invalido)
                }
                for(const i in aluno){
                    desc = aluno[i].desc
                    const atividade = await activitiesSchema.find({desc})
                    for(const j in atividade){
                        notas.push(atividade[j].nota)
                    }
                    const receivedEmbed = message.embeds[0]
                    const embed = new Discord.MessageEmbed(receivedEmbed)
                    .setTitle(aluno[i].tipoAtividade)
                    embed.setThumbnail('https://www.csvp.com.br/wp-content/uploads/2018/05/icone-prova.png')
                    embed.setColor('#2ba61e')
                    embed.setDescription(aluno[i].desc)
                    embed.addField('Nome', aluno[i].nome)
                    embed.addField('Nota', aluno[i].nota + ' / ' + notas[i])
                    if((aluno[i].nota * 100) / notas[i] >= 80){
                        embed.setColor('#2ba61e')
                    }else if((aluno[i].nota * 100) / notas[i] >= 60 & (aluno[i].nota * 100) / notas[i] <= 80){
                        embed.setColor('#0076ba')
                    }else{
                        embed.setColor('#9e0000')
                    }
                    embed.setFooter('Percentual atingido: ' + Math.round((aluno[i].nota * 100) / notas[i]) + '%')
                    
                    message.reply(embed)
                }
            }finally{
                mongoose.connection.close()
            }

        })

    }


}