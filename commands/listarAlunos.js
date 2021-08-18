const Discord = require('discord.js')
const alunosSchema = require('../alunos-schema')
const mongo = require('../mongo')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Listar todos os alunos cadastrados',
    callback: async ({message}) => {
        var alunos = []
        var alunosUnico = []
        const embed = new Discord.MessageEmbed()
        return await mongo().then(async mongoose => {
            try{
                const aluno = await alunosSchema.find()
                console.log('ALUNOS ENCONTRADOS:', aluno)
                for(const i in aluno){
                    alunos.push(aluno[i].nome)
                    alunosUnico = [...new Set(alunos)]
                }
                console.log('LISTA ALUNOS:', alunosUnico)
                embed.setTitle('ALUNOS CADASTRADOS')
                embed.setDescription(alunosUnico)
                embed.setThumbnail('https://w7.pngwing.com/pngs/744/327/png-transparent-education-computer-icons-school-student-school-angle-rectangle-graduation-ceremony.png')
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