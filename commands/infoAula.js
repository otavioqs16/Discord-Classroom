const Discord = require('discord.js')
const aulaSchema = require('../aula-schema')
const mongo = require('../mongo')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Informação de uma aula específica',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<aula>',
    callback: async ({message, args}) => {
        const embed = new Discord.MessageEmbed()
        const [aula] = args;
        return await mongo().then(async mongoose => {
            try{
                const findAula = await aulaSchema.find({aula})
                console.log('AULA ENCONTRADA:', findAula)
                if(findAula <= 0){
                    embed.setTitle('AULA NÃO ENCONTRADA')
                    embed.addField('Aula:', aula)
                    embed.setThumbnail('https://img.icons8.com/color/452/error--v1.png')
                    embed.setColor('#ffec5c')
                    embed.addField('Dica:', 'Utilize ``/listarAulas`` para checar as aulas postadas.')
                    return embed;
                }

                embed.setTitle(findAula[0].aula)
                embed.setDescription(`**Tipo: ** ${findAula[0].tipo}`)
                embed.setThumbnail('https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-teacher-education-presentation-school--flat-color-icon--vecto-png-image_1648907.jpg')
                embed.setColor('#6100e0')
                embed.addField('Link ', findAula[0].link)
                embed.addField('Data ', findAula[0].data)
                embed.addField('Hora ', findAula[0].hora + ' hs')

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