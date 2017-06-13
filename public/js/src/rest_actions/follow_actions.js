import axios from 'axios'

const is_following = user => {
    return dispatch => {
        axios.post('/api/is_following', { user })
            .then(is => dispatch({ type: "IS_FOLLOWING", payload: is.data }) )
            .catch(err => dispatch({ type: "IS_FOLLOWING_ERR", payload: err }) )
    }
}

const follower = follower => {
    return{
        type: "FOLLOWER",
        payload: follower
    }
}

const following = following => {
    return{
        type: "FOLLOWING",
        payload: following
    }
}

const unfollower = unfollower => {
    return{
        type: "UNFOLLOWER",
        payload: unfollower
    }
}

const unfollowing = unfollowing => {
    return {
        type: "UNFOLLOWING",
        payload: unfollowing
    }
}

const get_followers = user => {
    return dispatch => {
        axios.post('/api/get_followers', { user })
            .then(followers => dispatch({ type: "GET_FOLLOWERS", payload: followers.data }) )
            .catch(err => dispatch({ type: "GET_FOLLOWERS_ERR", payload: err }) )
    }
}

const get_followings = user => {
    return dispatch => {
        axios.post('/api/get_followings', { user })
            .then(following => dispatch({ type: "GET_FOLLOWINGS", payload: following.data }) )
            .catch(err => dispatch({ type: "GET_FOLLOWINGS_ERR", payload: err }) )
    }
}

const get_profile_views = user => {
    return dispatch => {
        axios.post('/api/get_profile_views', { user })
            .then(view => dispatch({ type: "GET_PROFILE_VIEWS", payload: view.data }) )
            .catch(err => dispatch({ type: "GET_PROFILE_VIEWS_ERR", payload: err }) )
    }
}

module.exports = {
    is_following,
    follower,
    following,
    unfollower,
    unfollowing,
    get_followers,
    get_followings,
    get_profile_views
}