const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const alunoSchema = mongoose.Schema({
    nome: reqString,
    email: reqString,
    ra: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('alunos', alunoSchema)