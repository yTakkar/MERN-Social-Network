import $ from 'jquery'
import * as fn from './functions/functions'

$('form.form_register').submit(e => {
    e.preventDefault()
    let signupOpt = {
        data: {
            username: $('.r_username').val(),
            email: $('.r_email').val(),
            password: $('.r_password').val(),
            password_again: $('.r_password_again').val()
        },
        btn: $('.r_submit'),
        url: "/user/signup",
        redirect: "/login",
        defBtnValue: "Sign up for free",
    }
    fn.commonLogin(signupOpt)
})

$('form.form_login').submit(e => {
    e.preventDefault()
    let loginOpt = {
        data: {
            username: $('.l_username').val(),
            password: $('.l_password').val()
        },
        btn: $('.l_submit'),
        url: "/user/login",
        redirect: "/",
        defBtnValue: "Login to continue",
    }
    fn.commonLogin(loginOpt)
})