const mongo = require('./mongo')
const alunoSchema = require('./aluno-schema')
const notaSchema = require('./notas-schema')

module.exports.addAluno = async (nome, email, ra) => {
    return await mongo().then(async mongoose => {
        try{
            const result = await alunoSchema.findOneAndUpdate({
                nome
            }, {
                nome,
                email,
                ra
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false
            })

            return result;
        } finally{
            mongoose.connection.close();
        }
    })
}

module.exports.delAluno = async (nome) => {
    return await mongo().then(async mongoose => {
        try{
            const result = await alunoSchema.findOneAndDelete({
                nome: nome
            })
            const result2 = await notaSchema.deleteMany({
                nome: nome
            })
            return result;
        } finally {
            mongoose.connection.close();
        }
    })
}