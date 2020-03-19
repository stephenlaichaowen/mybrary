if (process.env.NODE_EVN != 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const fs = require('fs')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const engine = require('ejs-locals')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log(`Connected to Mongoose`))

app.engine('ejs', engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static('client'))
app.use(express.json())
app.use(cookieParser())
app.use('/', indexRouter)

// app.get('/', (req, res) => { 
//   res.render('index')
// })

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server running on ${port}`);
})