const db = require('../models/db')
const chalk = require('./chalk')
const P = require('bluebird')
const fs = require('fs')
const path = require('path')
const dir = process.cwd()

const signup = (req, res) => {
    req.checkBody('username', 'Username is empty').notEmpty()
    req.checkBody('username', 'Username must contain only leters').isAlpha()
    req.checkBody('username', 'Username must be greater than 4').isLength({ min: 4 })
    req.checkBody('username', 'Username must be less than 32').isLength({ max: 32 })

    req.checkBody('email', 'Email is empty').notEmpty()
    req.checkBody('email', 'Email is invalid').isEmail()
    
    req.checkBody('password', 'Password field is empty').notEmpty()
    req.checkBody('password', 'Passwords don\'t match').equals(req.body.password_again)

    let errors = req.validationErrors()
    if(errors){
        let array = []
        for(let item of errors) {
            array.push(item.msg)
        }
        res.json({ mssg: array })
    } else {
        db.query('SELECT COUNT(*) as usernameCount from users WHERE username = ?', [req.body.username])
            .then(username => {
                if(username[0].usernameCount == 1){
                    res.json({ mssg: "Username already exists!" })
                } else {
                    return db.query('SELECT COUNT(*) as emailCount FROM users WHERE email = ?', [req.body.email])
                }
            })
            .then(email => {
                if(email[0].emailCount == 1){
                    res.json({ mssg: "Email already exists!" })
                } else {
                    let newUser = {
                        username: req.body.username, 
                        email: req.body.email,
                        password: req.body.password,
                        joined: new Date().getTime()
                    }  
                    return db.createUser(newUser)
                }
            })
            .then(user => {
                let { affectedRows, insertId } = user
                if(affectedRows == 1){
                    fs.mkdir(dir+`/public/users/${insertId}`, (err) => {
                        if(err){
                            console.log(err)
                        } else {
                            fs.createReadStream(dir+'/public/images/spacecraft.jpg').pipe(fs.createWriteStream(dir+`/public/users/${insertId}/user.jpg`))
                        }
                    })
                    res.json({ mssg: "You can login now!!", success: true })
                }
            })
            .catch(err => console.log(chalk.error(err)) )
    }
}

const login = (req, res) => {
    P.coroutine(function* (){
        req.checkBody('username', 'Username is empty').notEmpty()    
        req.checkBody('password', 'Password field is empty').notEmpty()

        let errors = req.validationErrors()
        if(errors){
            let array = []
            for(let item of errors) {
                array.push(item.msg)
            }
            res.json({ mssg: array })
        } else {
            let user = yield db.query('SELECT COUNT(id) as userCount, id, password from users WHERE username = ? LIMIT 1', [req.body.username])
            let [{userCount, id, password}] = user
            if(userCount == 0){
                res.json({ mssg: "User not found!" })
            } else if(userCount > 0) {
                let same = yield db.comparePassword(req.body.password, password)
                if(!same){
                    res.json({ mssg: "Wrong password!" })
                } else {
                    req.session.id = id
                    req.session.username = req.body.username       
                    res.json({ mssg: "Yepp you're the man", success: true })
                }
            }
        }
        
    })()
}

module.exports = {
    signup,
    login
}