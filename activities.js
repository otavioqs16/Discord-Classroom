const mongo = require('./mongo')
const activitieSchema = require('./activities-schema')

module.exports.addActivity = async (tipoAtividade, desc, link, nota, data, hora) => {
    return await mongo().then(async mongoose =>{
        try{
            const result = await activitieSchema.findOneAndUpdate({
                tipoAtividade,
                desc
            }, {
                tipoAtividade,
                desc,
                link,
                nota,
                data,
                hora
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false
            })
    
            return result
        }finally{
            mongoose.connection.close()
        }
    }) 
}

module.exports.delActivity = async (tipoAtividade, desc) => {
    return await mongo().then(async mongoose =>{
        try{
            const result = await activitieSchema.findOneAndDelete({
                tipoAtividade: tipoAtividade,
                desc: desc
            })
            return result
        }finally{
            mongoose.connection.close()
        }
        
    })
}