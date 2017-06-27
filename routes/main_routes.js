const app = require('express').Router()
const db = require('../models/db')
const chalk = require('../models/chalk')
const mw = require('../models/middlewares')

app.get('/welcome', (req, res) => {
    let options = { title: "Welcome to Notes App" }
    res.render('welcome', {options})
})

app.get('/', mw.MainRedirect, (req, res) => {
    let options = { title: "Notes App" }
    res.render('index', {options})
})

app.get('/edit', mw.LoggedIn, (req, res) => {
    let options = {  title: "Edit profile" }
    res.render('edit', {options})
})

app.get('/explore', mw.LoggedIn, (req, res) => {
    let options = { title: "Explore Users" }
    res.render('explore', { options })
})

app.get('/error', (req, res) => {
    let options = {  title: "Oops!" }
    res.render('error', {options})
})

module.exports = app