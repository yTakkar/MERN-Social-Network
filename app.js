require('dotenv').config()

// modules
const
    express = require('express'),
    hbs = require('express-handlebars'),
    port = process.env.PORT,
    path = require('path'),
    logger = require('morgan'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    validator = require('express-validator'),
    session = require('client-sessions'),
    app = express()

// file modules
const
    chalk = require('./models/chalk'),
    mainR = require('./routes/main_routes'),
    userR = require('./routes/user_routes'),
    apiR = require('./routes/api_routes'),
    mw = require('./models/middlewares')

// view engine
app.engine('handlebars', hbs({ extname: "handlebars" }))
app.set('view engine', 'handlebars')

// middlewares
app.use(favicon(path.join(__dirname, "/public/images/favicon/favicon.ico")))
// app.use(logger('dev'))
app.use(express.static(path.join(__dirname, "/public")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(validator())
app.use(session({
    cookieName: "session",
    secret: process.env.SESSION_SECRET_LETTER,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}))

// Middleware for some local variables to be used in templates
app.use(mw.variables)

// Routes middlewares
app.use('/', mainR)
app.use('/', userR)
app.use('/api', apiR)

// Middleware for 404 page
app.use(mw.not_found)

app.listen(port, () => console.log('App running..') )
