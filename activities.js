const mongo = require('./mongo')
const activitieSchema = require('./activities-schema')

module.exports.addActivity = async (tipoAtividade, desc, link, nota) => {
    return await mongo().then(async mongoose =>{
        try{
            console.log('Running findOneAndUpdate()')
            const result = await activitieSchema.findOneAndUpdate({
                tipoAtividade,
                desc
            }, {
                tipoAtividade,
                desc,
                link,
                nota
            }, {
                upsert: true,
                new: true
            })

            console.log('RESULT: ', result)
            return result
        }finally{
            mongoose.connection.close()
        }
    }) 
}
