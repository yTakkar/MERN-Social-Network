import axios from 'axios'

const getNotes = (get) => {
    return dispatch => {
        axios.post('/api/notes', { get })
            .then(notes => dispatch({ type: "GET_NOTES", payload: notes.data }) )
            .catch(err => dispatch({ type: "GET_NOTES_ERR", payload: err }) )
    }
}

const getFeeds = () => {
    return dispatch => {
        axios.post('/api/feeds')
            .then(notes => dispatch({ type: "GET_FEEDS", payload: notes.data }) )
            .catch(err => dispatch({ type: "GET_FEEDS_ERR", payload: err }) )
    }
}

const updateNotes = note => {
    return {
        type: "UPDATE_NOTES",
        payload: note
    }
}

const delete_note = note => {
    return {
        type: "DELETE_NOTE",
        payload: note      
    }
}

const edit_note = note => {
    return {
        type: "EDIT_NOTE",
        payload: note
    }
}

module.exports = {
    getNotes,
    getFeeds,
    updateNotes,
    delete_note,
    edit_note
}