const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./config/db')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const route = require('./routes')

const app = express()

dotenv.config()

app.use(cors())
app.use(bodyParser.json({ limit: '100mb' }))
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        limit: '100mb',
        extended: true,
    }),
)
app.use(cookieParser())

app.use(express.json())

//CONNECT DB
db.connect()

route(app)
app.get('/', (req, res) => {
    return res.status(200).json('hello')
})

app.listen(8000, () => {
    console.log('Server is running')
})
