const mongo = require('./mongo')
const aulaSchema = require('./aula-schema')

module.exports.addAula = async (aula, tipo, link, data, hora) => {
    return await mongo().then(async mongoose => {
        try{
            const result = await aulaSchema.findOneAndUpdate({
                aula
            }, {
                aula,
                tipo,
                link,
                data,
                hora
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false
            })

            return result
        } finally{
            mongoose.connection.close();
        }
    })
}