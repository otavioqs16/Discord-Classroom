const mongo = require('./mongo')
const activitieSchema = require('./activities-schema')
const notaSchema = require('./notas-schema')

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
            const result2 = await notaSchema.deleteMany({
                tipoAtividade: tipoAtividade,
                desc: desc
            })
            return result
        }finally{
            mongoose.connection.close()
        }
        
    })
}

module.exports.editActivity = async (tipoAtividade, desc, novoTipo, novaDesc, link, nota, data, hora) => {
    return await mongo().then(async mongoose => {
        try{
            const result = await activitieSchema.updateOne({
                tipoAtividade: tipoAtividade,
                desc: desc
            },{
                tipoAtividade: novoTipo,
                desc: novaDesc,
                link: link,
                nota: nota,
                data: data,
                hora: hora
            })
            return result
        } finally{
            mongoose.connection.close()
        }
    })
}