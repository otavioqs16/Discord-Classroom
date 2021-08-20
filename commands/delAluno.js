const Discord = require('discord.js')
const aluno = require('../alunos')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Excluir um aluno do sistema',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<nome aluno>',
    callback: async ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [nome] = args;
        console.log('NOME:', nome)

        const delStd = await aluno.delAluno(nome)
        console.log('EXCLUINDO ALUNO:', delStd)

        if(delStd === null){
            embed.setTitle('ALUNO NÃO ENCONTRADO')
            embed.setDescription(`**Nome:** ${nome}`)
            embed.setColor('#ffec5c')
            embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
            embed.addField('Dica:', 'Utilize ``/listarAlunos`` para checar os alunos cadastrados.')
        }else{
            embed.setTitle('ALUNO EXCLUÍDO COM SUCESSO!')
            embed.addField('Nome', delStd.nome)
            embed.addField('Email', delStd.email)
            embed.addField('RA', delStd.ra)
            embed.setColor("#d60000")
            embed.setThumbnail('https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png')
        }

        if(message){
            message.reply('', {embed})
        }

        return embed;

    }
}