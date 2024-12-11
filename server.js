const http = require('http')
const express = require('express')

const port  = process.env.PORT || 3000
const app = express()
const conjugationRoutes = require('./src/api/routes/conjugations')

const server = http.createServer(app)

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET')
        return res.status(200).json({})
    }

    next()
} )

app.use('/conjugations',conjugationRoutes)

server.listen(port)



