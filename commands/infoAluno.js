const Discord = require('discord.js')
const alunoSchema = require('../aluno-schema')
const mongo = require('../mongo')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Informações de um aluno específico',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<nome aluno>',
    callback: async ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [nome] = args;
        return await mongo().then(async mongoose => {
            try{
                const aluno = await alunoSchema.find({nome})
                console.log('ALUNO ENCONTRADO:', aluno)
                if(aluno <= 0){
                    embed.setTitle('ALUNO NÃO ENCONTRADO')
                    embed.setDescription(`**Nome:** ${nome}`)
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.setColor('#ffec5c')
                    embed.addField('Dica:', 'Utilize ``/listarAlunos`` para checar os alunos cadastrados.')
                    return embed;
                }

                embed.setTitle(aluno[0].nome)
                embed.setThumbnail('https://w7.pngwing.com/pngs/744/327/png-transparent-education-computer-icons-school-student-school-angle-rectangle-graduation-ceremony.png')
                embed.setColor('#6100e0')
                embed.addField('Email', aluno[0].email)
                embed.addField('RA', aluno[0].ra)

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