const Discord = require('discord.js')
const mongo = require('../mongo')
const notas = require('../notas')
const notaSchema = require('../notas-schema')
const activitiesSchema = require('../activities-schema')
const alunoSchema = require('../aluno-schema')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Editar a nota do aluno em uma atividade',
    minArgs: 4,
    maxArgs: 4,
    expectedArgs: '<nome aluno> <tipo atividade> <descricao atividade> <nova nota>',
    callback: async ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [nome, tipoAtividade, desc, novaNota] = args
        return await mongo().then(async mongoose => {
            try{    
                const ifAluno = await alunoSchema.find({nome})
                console.log('ALUNO ENCONTRADO', ifAluno)
                if(ifAluno.length <= 0){
                    embed.setTitle('ALUNO NÃO ENCONTRADO')
                    embed.setColor('#ffec5c')
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.addField('Nome:', nome)
                    embed.addField('Dica:', 'Utilize ``/listarAlunos`` para checar os alunos cadastrados.')
                    return embed;
                }

                const atividade = await activitiesSchema.find({tipoAtividade, desc})
                console.log('ATIIVIDADE ENCONTRADA:', atividade)
                if(atividade.length <= 0){
                    embed.setTitle('ATIVIDADE NÃO ENCONTRADA')
                    embed.setColor('#ffec5c')
                    embed.setDescription(`**Tipo de atividade:** ${tipoAtividade} \n**Descrição:** ${desc}`)
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.addField('Dica:', 'Utilize ``/listarTiposAtividade`` para checar os tipos de atividades existentes.')
                    return embed
                }
                
                if(novaNota > atividade[0].nota){
                    embed.setTitle('NOTA EXCEDIDA')
                    embed.setColor('#ffec5c')
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.addField('Nota Concedida', novaNota)
                    embed.addField('Nota Máxima da Atividade', atividade[0].nota)
                    return embed;
                }
                
                const notaAntiga = await notaSchema.find({nome, tipoAtividade, desc})
                console.log('NOTA ANTIGA:', notaAntiga)
                
                const edtNota = await notas.editNota(nome, tipoAtividade, desc, novaNota)
                console.log('NOTA EDITADA:', edtNota)

                embed.setTitle('NOTA ATUALIZADA COM SUCESSO!')
                embed.setThumbnail('https://www.csvp.com.br/wp-content/uploads/2018/05/icone-prova.png')
                embed.setColor('#44c294')
                embed.addField('Nome Aluno', notaAntiga[0].nome)
                embed.addField('Tipo atividade', notaAntiga[0].tipoAtividade)
                embed.addField('Descrição', notaAntiga[0].desc)
                embed.addField('Nota antiga', notaAntiga[0].nota)
                embed.addField('Nota atual', novaNota)

                if(message){
                    message.reply('', {embed})
                }

                return embed;

               
                
            } finally{
                mongoose.connection.close();
            }
        })
    }
}