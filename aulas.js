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

module.exports.editAula = async (aula, novaAula, tipo, link, data, hora) => {
    return await mongo().then(async mongoose => {
        try{
            const result = await aulaSchema.updateOne({
                aula: aula
            }, {
                aula: novaAula,
                tipo: tipo,
                link: link,
                data: data,
                hora: hora
            })
            return result;
        } finally{
            mongoose.connection.close();
        }
    })
}

module.exports.delAula = async (aula) => {
    return await mongo().then(async mongoose => {
        try{
            const result = await aulaSchema.findOneAndDelete({
                aula: aula
            })
            return result;
        } finally{
            mongoose.connection.close();
        }
    })
}