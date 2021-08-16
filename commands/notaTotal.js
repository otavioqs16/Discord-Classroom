const mongo = require('../mongo')
const alunoSchema = require('../alunos-schema')
const activitieSchema = require('../activities-schema')
const Discord = require('discord.js')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Informa a nota total de determinado aluno',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<nome aluno>',
    callback: async ({message, args}) => {
        nome = args.join(' ')
        console.log('NOME: ', nome)
        const embed = new Discord.MessageEmbed()
        var notasAluno = 0
        var atividadesRealizadas = 0
        var notasTotal = 0
        var atividadesTotal = 0
        return await mongo().then(async mongoose => {
            try{
                const aluno = await alunoSchema.find({nome})
                console.log('ALUNO:', aluno)
                if(aluno.length <= 0){
                    embed.setTitle('ALUNO NÃO CADASTRADO')
                    embed.setDescription(`**Nome:** ${nome}`)
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.addField('Dica:', 'Utilize ``!listarAlunos`` para checar os alunos cadastrados.')
                    return embed;
                }
                for(const i in aluno){
                    notasAluno = notasAluno + aluno[i].nota
                    atividadesRealizadas++
                }
                console.log('ATIVIDADES REALIZADAS: ', atividadesRealizadas)
                console.log('NOTA ALUNO: ', notasAluno)
                const atividades = await activitieSchema.find()
                console.log('ATIVIDADES: ', atividades)
                for(const j in atividades){
                    notasTotal = notasTotal + atividades[j].nota
                    atividadesTotal++
                }
                console.log('TOTAL DE ATIVIDADES: ', atividadesTotal)
                console.log('NOTA TOTAL: ', notasTotal)
                
                embed.setTitle('ALUNO: ' + nome)
                embed.setDescription('Atividades realizadas: ' + atividadesRealizadas + ' / ' + atividadesTotal)
                embed.setThumbnail('https://w7.pngwing.com/pngs/744/327/png-transparent-education-computer-icons-school-student-school-angle-rectangle-graduation-ceremony.png')
                embed.addField('Nota', notasAluno + ' / ' + notasTotal)
                if((notasAluno * 100) / notasTotal >= 80){
                    embed.setColor('#2ba61e')
                }else if((notasAluno * 100) / notasTotal >= 60 & (notasAluno * 100) / notasTotal <= 80){
                    embed.setColor('#0076ba')
                }else{
                    embed.setColor('#9e0000')
                }
                embed.setFooter('Percentual atingido: ' + Math.round((notasAluno * 100) / notasTotal) + '%')
                if(message){
                    message.reply('', {embed})
                }
                return embed


            }finally{
                mongoose.connection.close()
            }
        })
        
    }
}

