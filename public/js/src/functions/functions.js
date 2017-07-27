import $ from 'jquery'
import Notify from 'handy-notification'
import P from 'bluebird'
import axios from 'axios'
import * as follow_action from '../rest_actions/follow_actions'
import * as notes_actions from '../rest_actions/note_actions'
import * as note_int_actions from '../rest_actions/note_int_actions'

// FUNCTION FOR SHORTENING
const nameShortener = (elem, length) => {
  let parse = parseInt(length),
      len = elem.length
  if (!parse) { return; }
  return (len >= parse) ? `${elem.substr(0, length-2)}..` : (len < parse) ? elem : null
}

// FUNCTION FOR COMMON LOGIN
const commonLogin = (options) => {
    let { data, btn, url, redirect, defBtnValue } = options
    let overlay2 = $('.overlay-2')

    btn
      .attr('value', 'Please wait..')
      .addClass('a_disabled')
    overlay2.show()

    $.ajax({
        url,
        data,
        method: "POST",
        dataType: "JSON",
        success: (data) => {
            let { mssg, success } = data
            if(success){
              Notify({ value: mssg, done: () => location.href = redirect })
              btn.attr('value', 'Redirecting..')
              overlay2.show()
            } else {
              Notify({ value: mssg })
              btn
                .attr('value', defBtnValue)
                .removeClass('a_disabled')
              overlay2.hide()
            }
            btn.blur()
        }
    })
}

// FUNCTION TO CAPITALIZE FIRST LETTER OF A WORD
const capitilize_first = (str) => {
  return str.charAt(0).toUpperCase()+str.substr(1)
}

// FUNCTION TO CHECK WHETHER ITS ME OR NOT
const MeOrNot = user => {
  return user == $('#data').data('session') ? true : false
}

// FUNCTION TO CHECK WHETHER EMAIL IS ACTIVATED ON NOT
const e_verified = () => {
  let ea = $('.data').data('email-verified')
  return ea == "yes" ? true : false
}

// TO FOLLOW
const follow = options => {
  let defaults = {
    user: null,
    username: null,
    dispatch: null,
    update_followers: false,
    update_followings: false,
    done: () => { return null }
  }
  let obj = { ...defaults, ...options }
  let { user, username, dispatch, update_followers, update_followings, done } = obj

  $.ajax({
    url: "/api/follow",
    method: "POST",
    data: { user },
    dataType: "JSON",
    success: data => {

      let fwing = {
        follow_id: data.follow_id,
        follow_time: data.follow_time,
        follow_to: user,
        follow_to_username: username
      }

      update_followers ? dispatch(follow_action.follower(data)) : null
      update_followings ? dispatch(follow_action.following(fwing)) : null
      Notify({ value: 'Followed' })
      done()

    }
  })

}

// TO UNFOLLOW
const unfollow = options => {
  let defaults = {
    user: null,
    dispatch: null,
    update_followers: false,
    update_followings: false,
    done: () => { return null }
  }
  let obj = { ...defaults, ...options }
  let { user, dispatch, update_followers, update_followings, done } = obj

  $.ajax({
    url: "/api/unfollow",
    method: "POST",
    data: { user },
    dataType: "JSON",
    success: data => {
        update_followers ? dispatch(follow_action.unfollower($('#data').data('session'))) : null
        update_followings ? dispatch(follow_action.unfollowing(user)) : null
        Notify({ value: 'Unfollowed' })
        done()
    }
  })

}

// FOR DELETING A NOTE
const delete_note = options => {
  let { note_id, dispatch } = options
  $.ajax({
    url: "/api/delete_note",
    method: "POST",
    data: { note: note_id },
    dataType: "JSON",
    success: data => {
        Notify({ value: data.mssg })
        dispatch(notes_actions.delete_note(note_id))
    }
  })
}

// FOR EDITING A NOTE
const edit_note = options => {
  let { title, content, note_id, dispatch, done } = options
  $.ajax({
    url: "/api/edit_note",
    method: "POST",
    data: {
        title,
        content, 
        note_id
    },
    dataType: "JSON",
    success: data => {
        Notify({ value: data.mssg })
        dispatch(notes_actions.edit_note({title, content, note_id}))
        done()
    }
  })
}

// TO LIKE THE NOTE
const like = options => {
  let { note, dispatch, done } = options
  $.ajax({
    url: '/api/like',
    data: { note },
    method: "POST",
    dataType: "JSON",
    success: data => {
        Notify({ value: "Liked" })
        dispatch(note_int_actions.liked(data))
        done()
    }
  })
}

// TO UNLIKE THE NOTE
const unlike = options => {
  let { note, dispatch, done } = options
  $.ajax({
    url: '/api/unlike',
    data: { note },
    method: "POST",
    dataType: "JSON",
    success: data => {
        Notify({ value: "Unliked" })
        dispatch(note_int_actions.unliked(note))
        done()
    }
  })
}

// FUNCTION FOR EDTITNG PROFILE
const edit_profile = options => {
  P.coroutine(function *(){

    let 
      { susername, semail } = options,
      username = $('.e_username').val(),
      email = $('.e_email').val(),
      bio = $('.e_bio').val(),
      button = $('.e_done'),
      uCount = yield axios.post('/api/what-exists', { what: "username", value: username }),
      eCount = yield axios.post('/api/what-exists', { what: "email", value: email })
    
    button.addClass('a_disabled').text('Processing..').blur()

    if(!username){
        Notify({ value: "Username must not be empty!" })
    } else if(!email){
        Notify({ value: "Email must not be empty!" })
    } else if(uCount.data == 1 && username != susername){
        Notify({ value: "Username already exists!" })
    } else if(eCount.data == 1 && email != semail){
        Notify({ value: "Email already exists!" })
    } else {

      let 
        edit = yield axios.post('/api/edit-profile', { username, email, bio }),
        { mssg, success } = edit.data
        
      Notify({ value: mssg, done: () => success ? location.reload() : null })

    }

    button.removeClass('a_disabled').text('Done Editing').blur()

  })().catch(e => console.log(e.stack) )

}

const change_avatar = options => {
  let 
    { file } = options,
    { name, size, type } = file,
    allowed = ['image/png', 'image/jpeg', 'image/gif']
        
  if(!allowed.includes(type)){
      Notify({ value: "Only images allowed!" })
  } else {
      let form = new FormData()
      form.append('avatar', file)
      $.ajax({
          url: "/api/change_avatar",
          method: "POST",
          processData: false,
          contentType: false,
          data: form,
          dataType: "JSON",
          success: data => {
              console.log(data)
              Notify({ value: data.mssg, done: () => location.reload() })
          }
      })
  }
           
}

// FUNCTION FOR RE-SENDING EMAIL VERIFICATION LINK
const resend_vl = () => {
  let 
    vl = $('.resend_vl'),
    o = $('.overlay-2')

  vl
    .addClass('a_disabled')
    .text('Sending verification link..')
  o.show()
  axios.post('/api/resend_vl')
    .then(s => {
        Notify({ value: s.data.mssg })
        vl
          .removeClass('a_disabled')
          .text('Send verification link')
          .blur()
        o.hide()
    })

}

module.exports = {
    nameShortener,
    commonLogin,
    capitilize_first,
    MeOrNot,
    e_verified,
    follow,
    unfollow,
    delete_note,
    edit_note,
    like,
    unlike,
    edit_profile,
    change_avatar,
    resend_vl
}