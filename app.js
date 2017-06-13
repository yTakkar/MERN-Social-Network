require('dotenv').config()

// modules
const express = require('express')
const hbs = require('express-handlebars')
const port = process.env.port || 1130
const path = require('path')
const logger = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const validator = require('express-validator')
const session = require('client-sessions')
const app = express()

// file modules
const chalk = require('./models/chalk')
const mainR = require('./routes/main_routes')
const userR = require('./routes/user_routes')
const apiR = require('./routes/api_routes')
const mw = require('./models/middlewares')

// view engine
app.engine('hbs', hbs({ extname: "hbs" }))
app.set('view engine', 'hbs')

// middlewares
app.use(favicon(path.join(__dirname, "/public/images/favicon/favicon.ico")))
// app.use(logger('dev'))
app.use(express.static(path.join(__dirname, "/public")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(validator())
app.use(session({
    cookieName: "session",
    secret: "iamaprogrammer",
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}))

// Middleware for some local variables to be used in the template
app.use(mw.variables)

// Routes middlewares
app.use('/', mainR)
app.use('/', userR)
app.use('/api', apiR)

// Middleware for 404 page
app.use(mw.not_found)

app.listen(port, () => console.log('App running..') )
