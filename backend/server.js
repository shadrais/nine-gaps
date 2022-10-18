const express = require('express')
const cors = require('cors')
const { urlencoded } = require('express')
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
require('dotenv').config()
require('colors')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
connectDB()

app.use(express.json())
app.use(urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/v1', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
