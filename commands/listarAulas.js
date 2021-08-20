const Discord = require('discord.js')
const mongo = require('../mongo')
const aulaSchema = require('../aula-schema')

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Listar todas as aulas postadas',
    callback: async ({message}) => {
        const embed = new Discord.MessageEmbed()
        var vAulas = []
        return await mongo().then(async mongoose => {
            try{
                const aulas = await aulaSchema.find()
                console.log('AULAS ENCONTRADAS: ', aulas)
                for(const i in aulas){
                    vAulas.push(aulas[i].aula)
                }
                console.log('LISTA DE AULAS:', vAulas)
                embed.setTitle('AULAS POSTADAS')
                embed.setDescription(vAulas)
                embed.setThumbnail('https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-teacher-education-presentation-school--flat-color-icon--vecto-png-image_1648907.jpg')
                embed.setColor('#006e68')
                embed.addField('Dica:', 'Utilize ``/infoAula`` para checar as informações de uma aula específica.')

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