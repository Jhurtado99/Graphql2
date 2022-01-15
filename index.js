const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')
const { dbConnection } = require('./database/config')

const app = express()

dbConnection()

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "hola mundo"
    })
})

// ESTE SCHEMA SE USA ANTES DE CREAR EL ARCHIVO schema.js
// const schema = {}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

app.listen(process.env.PORT || 4000, () => {
    console.log(`Escuchando por el puerto ${process.env.PORT || 4000}`)
})