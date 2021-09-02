const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const aulaSchema = mongoose.Schema({
    aula: reqString,
    tipo: reqString,
    link: reqString,
    data: reqString,
    hora: reqString
})

module.exports = mongoose.model('aulas', aulaSchema)