const 
    db = require('./db'),
    pi = require('handy-image-processor'),
    P = require('bluebird')

const LoggedIn = (req, res, next) => {
    req.session.id ? next() : res.redirect('/login')
}

const NotLoggedIn = (req, res, next) => {
    !req.session.id ? next() : res.redirect('/')
}

const MainRedirect = (req, res, next) => {
    req.session.id ? next() : res.redirect('/welcome')
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
			is[0].e == 0 ? res.redirect('/error') : next()
        })
        .catch(err => console.log(err) )
}

const delete_temp_images = (req, res, next) => {
    pi.DeleteAllOfFolder(process.cwd()+'/public/temp/')
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