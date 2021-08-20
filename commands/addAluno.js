const Discord = require('discord.js')
const aluno = require('../alunos')
const alunoSchema = require('../aluno-schema')
const mongo = require('../mongo')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Adicionar novo aluno',
    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<nome aluno> <email> <ra>',
    callback: async ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        console.log('ARGS:', args)
        const [nome, email, ra] = args
        var addStd
        return await mongo().then(async mongoose => {
            try{
                const ifAluno = await alunoSchema.find({nome})
                console.log('ALUNO ENCONTRADO:', ifAluno)
                if(ifAluno.length <= 0){
                    embed.setTitle('ALUNO CADASTRADO COM SUCESSO!')
                    embed.setThumbnail('https://w7.pngwing.com/pngs/744/327/png-transparent-education-computer-icons-school-student-school-angle-rectangle-graduation-ceremony.png')
                    embed.setColor('#2ba61e')
                    embed.addField('Nome', nome)
                    embed.addField('Email', email)
                    embed.addField('RA', ra)
                    addStd = await aluno.addAluno(nome, email, ra)
                    console.log(addStd)
                } else{
                    embed.setTitle('ALUNO JA SE ENCONTRA CADASTRADO')
                    embed.setThumbnail('https://w7.pngwing.com/pngs/744/327/png-transparent-education-computer-icons-school-student-school-angle-rectangle-graduation-ceremony.png')
                    embed.setColor('#ffec5c')
                    embed.addField('Nome', ifAluno[0].nome)
                    embed.addField('Email', ifAluno[0].email)
                    embed.addField('RA', ifAluno[0].ra)
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