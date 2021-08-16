const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const alunoSchema = mongoose.Schema({
    nome: reqString,
    tipoAtividade: reqString,
    desc: reqString,
    nota: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('notaAlunos', alunoSchema)