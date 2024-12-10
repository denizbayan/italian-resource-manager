const http = require('http')
const express = require('express')

const port  = process.env.PORT || 3000
const app = express()
const conjugationRoutes = require('./src/api/routes/conjugations')



const server = http.createServer(app)

app.use('/conjugations',conjugationRoutes)

server.listen(port)



