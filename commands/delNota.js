const Discord = require('discord.js')
const notas = require('../notas')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Excluir a nota de um aluno',
    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<nome aluno> <tipo atividade> <descricao atividade>',
    callback: async ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [nome, tipoAtividade, desc] = args

        const delNota = await notas.delNota(nome, tipoAtividade, desc)
        console.log('EXCLUINDO NOTA:', delNota)

        if(delNota === null){
            embed.setTitle('ALUNO OU ATIVIDADE NÃO ENCONTRADOS')
            embed.setDescription(`**Nome:** ${nome} \n**Tipo de atividade:** ${tipoAtividade} \n**Descrição:** ${desc}`)
            embed.setColor('#ffec5c')
            embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
            embed.addField('Dica:', 'Utilize ``/listarAlunos`` para checar os alunos cadastrados ou ``/listarTiposAtividade`` para checar os tipos de atividades existentes.')
        }else{
            embed.setTitle('NOTA EXCLUÍDA COM SUCESSO!')
            embed.setColor("#d60000")
            embed.setThumbnail('https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png')
            embed.addField('Nome aluno', nome)
            embed.addField('Tipo Atividade', tipoAtividade)
            embed.addField('Descrição Atividade', desc)
            embed.addField('Nota', delNota.nota) 
        }

        if(message){
            message.reply('', {embed})
        }

        return embed;

    }
}