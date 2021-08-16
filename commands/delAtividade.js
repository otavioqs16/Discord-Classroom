const activity = require('../activities')
const Discord = require('discord.js')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Deletar atividade',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<tipo atividade> <descricao>',
    callback: async({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [tipoAtividade, desc] = args;
        
        const delAct = await activity.delActivity(tipoAtividade, desc)
        console.log('DELETANDO ATIVIDADE: ', delAct)

        if(delAct === null){
            embed.setTitle('ATIVIDADE NÃO ENCONTRADA')
            embed.setDescription(`**Tipo de atividade:** ${tipoAtividade} \n**Descrição:** ${desc}`)
            embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
            embed.addField('Dica:', 'Utilize ``!listarTiposAtividade`` para checar os tipos de atividades existentes.')
        }else{
            embed.setTitle('ATIVIDADE EXCLUÍDA COM SUCESSO')
            embed.setDescription(`**Tipo de atividade:** ${tipoAtividade} \n**Descrição:** ${desc}`)
            embed.setColor("#d60000")
            embed.setThumbnail('https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png')
        }

        if(message){
            message.reply('', {embed})
        }
       
        return embed
    }
}