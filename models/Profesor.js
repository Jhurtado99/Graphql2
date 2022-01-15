const { Schema, model } = require('mongoose')

const ProfesorSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    },
    fecha: {
        type: String,
        required: true
    }
})

module.exports = model('Profesor', ProfesorSchema, 'profesores')