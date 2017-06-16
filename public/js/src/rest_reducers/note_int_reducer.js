import $ from 'jquery'

const note_int_defaults = {
    liked: false,
    likes: []
}

const note_int = (state=note_int_defaults, action) => {
    switch(action.type){
        case "LIKED_OR_NOT": {
            return { ...state, liked: action.payload }
        }
        case "LIKES": {
            return { ...state, likes: action.payload }
        }
        case "LIKED": {
            return { ...state, liked: true, likes: liked(state.likes, action.payload) }
        }
        case "UNLIKED": {
            return { ...state, liked: false, likes: unliked(state.likes, action.payload) }
        }
    }
    return state
}

const liked = (likes, like) => {
    likes.unshift(like)
    return likes
}

const unliked = (likes, note) => {
    let user = $('#data').data('session')
    return likes.filter(l => l.like_by != user && l.note_id == note )
}

export default note_int