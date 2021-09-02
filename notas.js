const mongo = require('./mongo')
const notaSchema = require('./notas-schema')
const activitieSchema = require('./activities-schema')

module.exports.addNota = async (nome, tipoAtividade, desc, nota) => {
    return await mongo().then(async mongoose => {
        try{
            const results = await activitieSchema.find({tipoAtividade, desc})
            if(results.length <= 0){
                console.log('Esse tipo de atividade não existe!') 
                return
            }
            const result = await notaSchema.findOneAndUpdate({
                nome,
                tipoAtividade,
                desc
            }, {
                nome,
                tipoAtividade,
                desc,
                nota
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false
            })

            return result;
        }finally{
            mongoose.connection.close();
        }
    })
}