import $ from 'jquery'
import * as follow_action from '../rest_actions/follow_actions'

// FUNCTION FOR SHORTENING
const nameShortener = (elem, length) => {
  if (!parseInt(length)) { return; }
  if (elem.length >= parseInt(length)) {
    return elem.substr(0, length-2)+"..";
  } else if (elem.length < parseInt(length)) {
    return elem;
  }
}

// FUNCTION TO COPY SPECIFIED TEXT TO CLIPBOARD
const copyTextToClipboard = (text) => {
  var
    textArea = document.createElement("textarea"),
    st = textArea.style;

  st.position = 'fixed';
  st.top = 0;
  st.left = 0;
  st.width = '2em';
  st.height = '2em';
  st.padding = 0;
  st.border = 'none';
  st.outline = 'none';
  st.boxShadow = 'none';
  st.background = 'transparent';

  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'Link copied!' : 'Unable to copy';
    console.log(msg);
    $('.notify').notify({ value: msg })
  } catch (err) {
    console.log('Unable to copy');
    $('.notify').notify({ value: 'Unable to copy' });
  }

  document.body.removeChild(textArea);

}

// FUNCTION TO NOTIFY
const notify = options => {
  let defaults = {
    beforeTop: "105%",
    afterTop : "90%",
    value    : "Message",
    selector: $('.notify'),
    action   : null,
    done: null
  }
  let settings = { ...defaults, ...options }
  
  let { selector, value, beforeTop, afterTop, action, done } = settings

  selector.children().filter('span').html(value)

  selector.animate({
    top: afterTop
  }, "fast", () => {
    (done != null) ? location.href = done : null
    setTimeout(() => {
      selector.animate({ top: beforeTop })
    }, 3000)
  })

  selector.on('click', (e) => {
    if (action != null) {
      location.href = action
    }
    selector.animate({
      top: beforeTop
    })
  })

}

// FUNCTION FOR COMMON LOGIN
const commonLogin = (options) => {
    let { data, btn, url, redirect, defBtnValue } = options
    let overlay2 = $('.overlay-2')

    btn.attr('value', 'Please wait..')
    overlay2.show()

    $.ajax({
        url,
        data,
        method: "POST",
        dataType: "JSON",
        success: (data) => {
            let { mssg, success } = data
            notify({ value: mssg, done: redirect })
            if(success){
                btn.attr('value', 'Redirecting..')
                overlay2.show()
            } else {
                btn.attr('value', defBtnValue)
                overlay2.hide()
            }
            btn.blur()
        }
    })
}

const capitilize_first = (str) => {
  return str.charAt(0).toUpperCase()+str.substr(1)
}

const time_ago = time => {

  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }

  var time_formats = [
    [60, 'secs', 1], // 60
    [120, '1 min ago', '1 min from now'], // 60*2
    [3600, 'mins', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ]

  var seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}

const MeOrNot = user => {
  return user == $('#data').data('session') ? true : false
}

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
      notify({ value: 'Followed' })
      done()

    }
  })

}

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
        notify({ value: 'Unfollowed' })
        done()
    }
  })

}

module.exports = {
    nameShortener,
    copyTextToClipboard,
    notify,
    commonLogin,
    capitilize_first,
    time_ago,
    MeOrNot,
    follow,
    unfollow
}