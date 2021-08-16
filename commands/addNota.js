const Discord = require("discord.js")
const notas = require('../notas')
const mongo = require('../mongo')
const activitiesSchema = require('../activities-schema')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Adicionar nota ao aluno',
    minArgs: 4,
    maxArgs: 4,
    expectedArgs: '<nome aluno> <tipo atividade> <descricao atividade> <nota>',
    callback: async({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [nome, tipoAtividade, desc, nota] = args;
        return await mongo().then(async mongoose => {
            try{
                const atividade = await activitiesSchema.find({desc})
                console.log('ATIVIDADE ENCONTRADA: ', atividade)

                if(atividade.length <= 0){
                    embed.setTitle('ATIVIDADE NÃO ENCONTRADA')
                    embed.setDescription(`**Tipo de atividade:** ${tipoAtividade} \n**Descrição:** ${desc}`)
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.addField('Dica:', 'Utilize ``!listarAtividades <tipo da atividade>`` para checar as atividades existentes.')
                    return embed
                }

                if(nota > atividade[0].nota){
                    embed.setTitle('ESTÁ DANDO NOTA MAIOR DO QUE PODE')
                    embed.setDescription(`NOTA ATUAl: ${nota} / NOTA MAXIMA: ${atividade[0].nota}`)
                    return embed
                }

                const addNota = await notas.addNota(nome, tipoAtividade, desc, nota)
                console.log('ADICIONANDO NOTA A ATIVIDADE: ', addNota)

                if(!addNota){
                    embed.setTitle('ATIVIDADE NÃO ENCONTRADA')
                    embed.setDescription(`**Tipo de atividade:** ${tipoAtividade} \n**Descrição:** ${desc}`)
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.addField('Dica:', 'Utilize ``!listarAtividades <tipo da atividade>`` para checar as atividades existentes.')
                }
                else{
                    embed.setTitle(`Tipo de Atividade: ${tipoAtividade}`)
                    embed.setDescription(`**Descrição:** ${desc}`)
                    embed.setThumbnail('https://www.csvp.com.br/wp-content/uploads/2018/05/icone-prova.png')
                    embed.addField('Nome Aluno:', nome)
                    embed.addField('Nota:', nota + ' / ' + atividade[0].nota)
                    if((nota * 100) / atividade[0].nota >= 80){
                        embed.setColor('#2ba61e')
                    }else if((nota * 100) / atividade[0].nota >= 60 & (nota * 100) / atividade[0].nota <= 80){
                        embed.setColor('#0076ba')
                    }else{
                        embed.setColor('#9e0000')
                    }
                    embed.setFooter('Percentual atingido: ' + Math.round((nota * 100) / atividade[0].nota) + '%')
                    
                }
        
                if(message) {
                    message.reply('', {embed})
                }
            
                return embed;

            }finally{
                mongoose.connection.close()
            }


        })
        
    }
}
        