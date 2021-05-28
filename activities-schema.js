const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const activitieSchema = mongoose.Schema({
    tipoAtividade: reqString,
    desc: reqString,
    link: reqString,
    nota: {
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model('atividades', activitieSchema)