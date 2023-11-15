import express from 'express'
import cors from 'cors'
import http from 'http'

const app = express()
app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: '*' }))

app.get('/ping', (req, res) => {
    res.status(200).send('pong')
})

const PORT = process.env.PORT || 4000
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server listening on port :${PORT}`)
})

