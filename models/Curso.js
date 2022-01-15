const { Schema, model } = require('mongoose')

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    lenguaje: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    profesorId: {
        type: String,
        required: true
    }
})

module.exports = model('Curso', CursoSchema)