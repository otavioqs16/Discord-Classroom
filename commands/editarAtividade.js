const Discord = require('discord.js')
const mongo = require('../mongo')
const atividades = require('../activities')
const activitieSchema = require('../activities-schema')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Editar informações de uma atividade',
    minArgs: 8,
    maxArgs: 8,
    expectedArgs: '<tipo atividade> <descricao> <novo tipo atividade> <nova descricao> <novo link> <nova nota> <nova data> <nova hora>',
    callback: async ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [tipoAtividade, desc, novoTipo, novaDesc, link, nota, data, hora] = args
        return await mongo().then(async mongoose => {
            try{
                const atividadeAntiga = await activitieSchema.find({tipoAtividade, desc})
                console.log('ATIVIDADE ANTIGA:', atividadeAntiga)
                const edtAct = await atividades.editActivity(tipoAtividade, desc, novoTipo, novaDesc, link, nota, data, hora)
                console.log('ATIVIDADE EDITADA:', edtAct)
                if(edtAct.nModified == 0){
                    embed.setTitle('ATIVIDADE NÃO ENCONTRADA')
                    embed.setDescription(`**Tipo de atividade:** ${tipoAtividade}`)
                    embed.setColor('#ffec5c')
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.addField('Dica:', 'Utilize ``/listarTiposAtividade`` para checar os tipos de atividades existentes.')
                }else{
                    embed.setTitle('ATIVIDADE ATUALIZADA COM SUCESSO!')
                    embed.setThumbnail('https://image.freepik.com/free-vector/education-test-icon-set_108855-1414.jpg')
                    embed.setColor('#44c294')
                    embed.addField('Tipo antigo', atividadeAntiga[0].tipoAtividade, true)
                    embed.addField('Descrição antiga', atividadeAntiga[0].desc, true)
                    embed.addField('Link antigo', atividadeAntiga[0].link, true)            
                    embed.addField('Nota antiga', atividadeAntiga[0].nota, true)  
                    embed.addField('Data antiga', atividadeAntiga[0].data, true)  
                    embed.addField('Hora antiga', atividadeAntiga[0].hora, true)  
                    embed.addField('Tipo atual', novoTipo)
                    embed.addField('Descrição atual', novaDesc)
                    embed.addField('Link atual', link)
                    embed.addField('Nota atual', nota)
                    embed.addField('Data atual', data)
                    embed.addField('Hora atual', hora)
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