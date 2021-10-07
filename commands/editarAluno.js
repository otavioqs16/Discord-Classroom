const Discord = require('discord.js');
const mongo = require('../mongo')
const alunos = require('../alunos');
const alunoSchema = require('../aluno-schema')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Editar informações de um aluno',
    minArgs: 4,
    maxArgs: 4,
    expectedArgs: '<nome aluno> <novo nome> <novo email> <novo ra>',
    callback: async ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [nome, nomeNovo, email, ra] = args;
        return await mongo().then(async mongoose => {
            try{
                const alunoAntigo = await alunoSchema.find({nome})
                console.log('ALUNO ANTIGO', alunoAntigo)
                const edtAluno = await alunos.editAluno(nome, nomeNovo, email, ra)
                console.log('ALUNO EDITADO:', edtAluno)
                if(edtAluno.nModified == 0){
                    embed.setTitle('ALUNO NÃO ENCONTRADO')
                    embed.setDescription(`**Nome:** ${nome}`)
                    embed.setColor('#ffec5c')
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.addField('Dica:', 'Utilize ``/listarAlunos`` para checar os alunos cadastrados.')
                }else{
                    embed.setTitle('ALUNO ATUALIZADO COM SUCESSO!')
                    embed.setThumbnail('https://w7.pngwing.com/pngs/744/327/png-transparent-education-computer-icons-school-student-school-angle-rectangle-graduation-ceremony.png')
                    embed.setColor('#44c294')
                    embed.addField('Nome antigo', alunoAntigo[0].nome, true)
                    embed.addField('Email antigo', alunoAntigo[0].email, true)
                    embed.addField('RA antigo', alunoAntigo[0].ra, true)            
                    embed.addField('Nome atual', nomeNovo)
                    embed.addField('Email atual', email)
                    embed.addField('RA atual', ra)
                }
                
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