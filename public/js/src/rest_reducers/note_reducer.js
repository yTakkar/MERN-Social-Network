const notes_state = {
    notes: [],
}

const notes = (state=notes_state, action) => {
    switch (action.type) {
        case "GET_NOTES": {
            return { ...state, notes: action.payload }
        }
        case "GET_FEEDS": {
            return { ...state, notes: action.payload }
        }
        case "UPDATE_NOTES": {
            return { ...state, notes: update_note(state.notes, action.payload) }
        }
        case "DELETE_NOTE": {
            return { ...state, notes: delete_note(state.notes, action.payload) }
        }
        case "EDIT_NOTE": {
            return { ...state, notes: edit_note(state.notes, action.payload) }
        }
    }
    return state
}

const update_note = (notes, note) => {
    notes.unshift(note)
    return notes
}

const delete_note = (notes, note) => {
    return notes.filter(n => n.note_id !== parseInt(note) )
}

const edit_note = (notes, note) => {
    return notes.map(elem => {
        if(elem.note_id == note.note_id){
            elem.title = note.title
            elem.content = note.content
        } 
        return elem
    })
}

export default notes