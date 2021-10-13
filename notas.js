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

module.exports.editNota = async (nome, tipoAtividade, desc, novaNota) => {
    return await mongo().then(async mongoose => {
        try{
            const result = await notaSchema.updateOne({
                nome: nome,
                tipoAtividade: tipoAtividade,
                desc: desc
            }, {
                nome: nome, 
                tipoAtividade: tipoAtividade,
                desc: desc,
                nota: novaNota
            })
            
            return result;
        } finally{
            mongoose.connection.close();
        }
    })
}

module.exports.delNota = async (nome, tipoAtividade, desc) => {
    return await mongo().then(async mongoose => {
        try{
            const result = await notaSchema.findOneAndDelete({
                nome: nome,
                tipoAtividade: tipoAtividade,
                desc: desc
            })
            return result;
        } finally{
            mongoose.connection.close();
        }
    })
}
