const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD
    }
})

let mail = (options) => {
    return new Promise((resolve, reject) => {
        let o = Object.assign({}, {from: "<teaminstagramme@gmail.com>"}, options )
        transporter.sendMail(o, (err, res) => {
            if(err){
                reject(err)
            } else {
                resolve('Mail sent!!')
            }
        })
    })
}

module.exports = mail