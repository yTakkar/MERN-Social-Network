const db = require('./db')
const file = require('./file_system')
const P = require('bluebird')

const LoggedIn = (req, res, next) => {
    if(req.session.id){
        next()
    } else {
        res.redirect('/login')
    }
}

const NotLoggedIn = (req, res, next) => {
    if(!req.session.id){
        next()
    } else {
        res.redirect('/profile')
    }
}

const MainRedirect = (req, res, next) => {
    if(req.session.id){
        next()
    } else {
        res.redirect('/welcome')
    }
}

const variables = (req, res, next) => {
    let loggedIn = (req.session.id) ? true : false
    res.locals.loggedIn = loggedIn
    res.locals.session = req.session
    next()
}

const not_found = (req, res, next) => {
    let options = {  title: "Oops!" }
    res.status(404).render('error', {options})
}

const MeOrNot = (req, res, next) => {
    db.query('SELECT COUNT(id) as e FROM users WHERE id=?', [req.params.id])
        .then(is => {
            if(is[0].e == 0){
                res.redirect('/error')
            } else {
                next()
            }
        })
        .catch(err => console.log(err) )
}

const delete_temp_images = (req, res, next) => {
    file.dlt_all_of_folder(process.cwd()+'/public/temp/')
    next()
}

const view_profile = (req, res, next) => {
    let { params: { id: get }, session: { id: session, username } } = req
    if(get != session){
        let insert = {
            view_by: session, 
            view_by_username: username,
            view_to: get,
            view_time: new Date().getTime()
        }
        db.query('INSERT INTO profile_views SET ?', insert)
    }
    next()
}

module.exports = {
    LoggedIn,
    NotLoggedIn,
    MainRedirect,
    variables,
    not_found,
    MeOrNot,
    delete_temp_images,
    view_profile
}