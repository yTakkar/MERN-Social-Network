const app = require('express').Router()
const db = require('../models/db')
const upload = require('multer')({ dest: `${process.cwd()}/public/temp/` })
const gm = require('../models/gm')
const file = require('../models/file_system')
const P = require('bluebird')

// FOR NOTES
app.post('/notes', (req, res) => {
    db.query("SELECT * FROM notes WHERE user = ? ORDER BY note_id DESC", [req.body.get])
        .then(notes => res.json(notes) )
})

// /FOR DETAILS OF GIVEN USER
app.post('/get_details', (req, res) => {
    db.query('SELECT id, username, email, bio, joined FROM users WHERE id=?', [req.body.get])
        .then(get => res.json(get[0]) )
        .catch(err => res.json(err) )
})

// FOR CREATING A NOTE
app.post('/create_note', (req, res) => {
    let { session, body } = req
    let insert = {
        user: session.id,
        username: session.username,
        title: body.title,
        content: body.content,
        note_time: new Date().getTime()
    }
    db.query('INSERT INTO notes SET ?', insert)
        .then(data => {
            (data.affectedRows == 1) ? res.json(Object.assign({}, insert, { note_id: data.insertId, mssg: 'Note created!' })) : null
        })
        .catch(err => res.json(err) )
})

// FOR DELETING A NOTE
app.post('/delete_note', (req, res) => {
    db.query('DELETE FROM notes WHERE note_id = ?', [req.body.note])
        .then(del => (del.affectedRows == 1) ? res.json({ mssg: 'Note deleted!' }) : null )
        .catch(err => res.json(err) )
})

// FOR EDITING A NOTE
app.post('/edit_note', (req, res) => {
    let { title, content, note_id } = req.body
    db.query('UPDATE notes SET title=?, content=? WHERE note_id=? AND user=?', [title, content, note_id, req.session.id])
        .then(update => (update.affectedRows == 1) ? res.json({ mssg: 'Note edited!' }) : null )
        .catch(err => res.json(err) )
})

// FOR EDITING PROFILE
app.post('/edit_profile', (req, res) => {
    let { username, email, bio } = req.body,    
        { id: session } = req.session

    req.checkBody('username', 'Username is empty').notEmpty()
    req.checkBody('username', 'Username must contain only leters').isAlpha()
    req.checkBody('username', 'Username must be greater than 4').isLength({ min: 4 })
    req.checkBody('username', 'Username must be less than 32').isLength({ max: 32 })

    req.checkBody('email', 'Email is empty').notEmpty()
    req.checkBody('email', 'Email is invalid').isEmail()

    let errors = req.validationErrors()
    console.log(errors)
    if(errors){
        let array = []
        for(let item of errors) {
            array.push(item.msg)
        }
        res.json({ mssg: array })
    } else {
        P.coroutine(function *(){
            req.session.username = username
            let edit = yield db.query('UPDATE users SET username=?, email=?, bio=? WHERE id=?', [username, email, bio, session]),
                notes = yield db.query('UPDATE notes SET username=? WHERE user=?', [username, session])
                view = yield db.query('UPDATE profile_views SET view_by_username = ? WHERE view_by=?', [username, session]),
                follower = yield db.query('UPDATE follow_system SET follow_by_username = ? WHERE follow_by=?', [username, session]),
                following = yield db.query('UPDATE follow_system SET follow_to_username = ? WHERE follow_to=?', [username, session])
            res.json({ mssg: ['Profile edited!'] })
        })()
    }

})

// FOR CHANGING AVATAR
app.post('/change_avatar', upload.single('avatar'), (req, res) => {
    P.coroutine(function*(){
        let obj = {
            srcFile: req.file.path,
            width: 200,
            height: 200,
            destFile: `${process.cwd()}/public/users/${req.session.id}/user.jpg`
        }
        let modify = yield gm(obj)
        let dlt = yield file.dlt_all_of_folder(`${process.cwd()}/public/temp/`)
        res.json({ mssg: "Avatar changed!" })
    })()
})

// TO CHECK IF SESSION FOLLOWING USER
app.post('/is_following', (req, res) => {
    db.query('SELECT COUNT(follow_id) AS is_following FROM follow_system WHERE follow_by=? AND follow_to=? LIMIT 1', [req.session.id, req.body.user])
        .then(is => res.json((is[0].is_following == 1) ? true : false) )
        .catch(err => res.json(err))
})

// TO FOLLOW
app.post('/follow', (req, res) => {
    P.coroutine(function* (){
        let get_username = yield db.query('SELECT username FROM users WHERE id=? LIMIT 1', [req.body.user])
            let insert = {
                follow_by: req.session.id, 
                follow_by_username: req.session.username,
                follow_time: new Date().getTime()
            }
            let insert_two = {
                follow_to_username: get_username[0].username,
                follow_to: req.body.user,
            }
        let follow = yield db.query('INSERT INTO follow_system SET ?', Object.assign({}, insert, insert_two ))
        res.json(Object.assign({}, insert, { follow_id: follow.insertId } ))
    })()
})

// TO UNFOLLOW
app.post('/unfollow', (req, res) => {
    db.query('DELETE FROM follow_system WHERE follow_by=? AND follow_to=?', [req.session.id, req.body.user])
        .then(unfollow => res.json(unfollow) )
        .catch(err => res.json(err) )
})

// GET FOLLOWERS
app.post('/get_followers', (req, res) => {
    db.query('SELECT follow_id, follow_by, follow_by_username, follow_time FROM follow_system WHERE follow_to = ? ORDER BY follow_time DESC', [req.body.user])
        .then(followers => res.json(followers) )
        .catch(err => res.json(err) )
})

// GET FOLLOWINGS
app.post('/get_followings', (req, res) => {
    db.query('SELECT follow_id, follow_to, follow_to_username, follow_time FROM follow_system WHERE follow_by = ? ORDER BY follow_time DESC', [req.body.user])
        .then(followings => res.json(followings) )
        .catch(err => res.json(err) )
})

// GET FOLLOWINGS
app.post('/get_profile_views', (req, res) => {
    db.query('SELECT view_by, view_time FROM profile_views WHERE view_to = ? ORDER BY view_time DESC', [req.body.user])
        .then(views => res.json(views) )
        .catch(err => res.json(err) )
})

// GET ALL FEEDS
app.post('/feeds', (req, res) => {
    db.query('SELECT notes.note_id, notes.user, notes.username, notes.title, notes.content, notes.note_time FROM notes, follow_system WHERE follow_system.follow_by = ? AND follow_system.follow_to = notes.user ORDER BY notes.note_time DESC', [req.session.id])
    .then(feed => res.json(feed) )
    .catch(err => res.json(err) )
})

// CHECK IF SESSION LIKED THE NOTE OR NOT
app.post('/liked_or_not', (req, res) => {
    db.query('SELECT COUNT(like_id) AS l FROM likes WHERE like_by = ? AND note_id = ?', [req.session.id, req.body.note])
        .then(is => res.json((is[0].l == 1) ? true : false) )
        .catch(err => res.json(err) )
})

// GET LIKES OF THE NOTE
app.post('/likes', (req, res) => {
    db.query('SELECT * FROM likes WHERE note_id=? ORDER BY like_id DESC', [req.body.note])
        .then(likes => res.json(likes) )
        .catch(err => res.json(err) )
})

// FOR LIKING THE NOTE
app.post('/like', (req, res) => {
    let insert = {
        like_by: req.session.id,
        like_by_username: req.session.username,
        note_id: parseInt(req.body.note),
        like_time: new Date().getTime()
    }
    db.query('INSERT INTO likes SET ?', insert)
        .then(liked => res.json(Object.assign({}, insert, { like_id: liked.insertId })) )
        .catch(err => res.json(err) )
})

app.post('/unlike', (req, res) => {
    db.query('DELETE FROM likes WHERE note_id=? AND like_by=?', [req.body.note, req.session.id])
        .then(unlike => res.json(unlike) )
        .catch(err => res.json(err) )
})

app.post('/get_explores', (req, res) => {
    db.query('SELECT id, username, email FROM users WHERE id <> ? ORDER BY RAND() LIMIT 10', [req.session.id])
        .then(explores => res.json(explores) )
        .catch(err => res.json(err) )
})

module.exports = app