const Discord = require('discord.js')
const mongo = require('../mongo')
const aulas = require('../aulas')
const aulaSchema = require('../aula-schema')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Editar informações de uma aula',
    minArgs: 6,
    maxArgs: 6,
    expectedArgs: '<aula> <nova aula> <novo tipo-aula> <novo link> <nova data> <nova hora>',
    callback: async ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [aula, novaAula, tipo, link, data, hora] = args
        return await mongo().then(async mongoose => {
            try{
                const aulaAntiga = await aulaSchema.find({aula})
                console.log('AULA ANTIGA:', aulaAntiga)
                const edtAula = await aulas.editAula(aula, novaAula, tipo, link, data, hora)
                console.log('AULA EDITADA:', edtAula)
                if(edtAula.nModified == 0){
                    embed.setTitle('AULA NÃO ENCONTRADA')
                    embed.addField('Aula:', aula)
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.setColor('#ffec5c')
                    embed.addField('Dica:', 'Utilize ``/listarAulas`` para checar as aulas postadas.')
                }else{  
                    embed.setTitle('AULA ATUALIZADA COM SUCESSO!')
                    embed.setThumbnail('https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-teacher-education-presentation-school--flat-color-icon--vecto-png-image_1648907.jpg')
                    embed.setColor('#44c294')
                    embed.addField('Aula antiga', aulaAntiga[0].aula, true)
                    embed.addField('Tipo antigo', aulaAntiga[0].tipo, true)
                    embed.addField('Link antigo', aulaAntiga[0].link, true)
                    embed.addField('Data antiga', aulaAntiga[0].data, true)
                    embed.addField('Hora antiga', aulaAntiga[0].hora, true)            
                    embed.addField('Aula atual', novaAula)
                    embed.addField('Tipo atual', tipo)
                    embed.addField('Link atual', link)
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