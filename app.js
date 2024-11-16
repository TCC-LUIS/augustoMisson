const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

require('dotenv').config()

const port = process.env.PORT || 3000
app.use(
  cors({
    origin: 'http://127.0.0.1:5500'
  })
)
app.use(bodyParser.json())
const Router = require('./routes/routes')
app.use('/uploads', express.static('uploads'))

app.use(Router)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
