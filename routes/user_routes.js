const app = require('express').Router()
const db = require('../models/db')
const chalk = require('../models/chalk')
const mw = require('../models/middlewares')
const login = require('../models/_login')
const P = require('bluebird')

app.get('/signup', mw.NotLoggedIn, (req, res) => {
    let options = { title: "Signup to note" }
    res.render('register', {options})
})

app.get('/registered', mw.LoggedIn, (req, res) => {
    login.registered(req, res)
})

app.get('/activate/:id', mw.LoggedIn, (req, res) => {
    login.activate(req, res)
})

app.get('/login', mw.NotLoggedIn, (req, res) => {
    let options = { title: "Login to note" }
    res.render('login', {options})
})

app.post('/user/signup', (req, res) => {
    login.signup(req, res)
})

app.post('/user/login', (req, res) => {
    login.login(req, res)
})

app.get('/profile/:id', mw.LoggedIn, mw.MeOrNot, mw.view_profile, (req, res) => {
    P.coroutine(function* (){
        let username = yield db.query('SELECT username FROM users WHERE id=?', [req.params.id])
        let options = { title: `@${username[0].username} • Notes App`, getid: req.params.id }
        res.render('profile', {options})
    })()
})

app.get('/logout', mw.LoggedIn, (req, res) => {
    req.session.id = null
    if(req.session.id == null){
        res.redirect('/login')
    }
})

module.exports = app