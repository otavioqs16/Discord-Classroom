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
        
        const del = await activity.delActivity(tipoAtividade, desc)
        console.log(del)

        if(del === null){
            embed.setTitle('Atividade não encontrada')
        }else{
            embed.setTitle('Atividade excluída com sucesso!')
        }

        if(message){
            message.reply('', {embed})
        }
       
        return embed
    }
}