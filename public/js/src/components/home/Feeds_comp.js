import React from 'react'
import Note from '../others/note_comp'

export default class Feeds extends React.Component{
    render(){
        let { notes: { notes }, dispatch, user: { user_details }, note_int } = this.props,
            map_notes = notes.map(note => {
                return <Note key={note.note_id} {...note} dispatch={dispatch} user_details={user_details} note_int={note_int} />
            })
        return(
            <div class='feeds_wrapper' >
                {map_notes}
            </div>
        )
    }
}