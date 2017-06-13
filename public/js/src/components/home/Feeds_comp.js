import React from 'react'
import Note from '../others/note_comp'

export default class Feeds extends React.Component{
    render(){
        let map_notes = this.props.notes.notes.map(note => {
            return <Note key={note.note_id} {...note} dispatch={this.props.dispatch} user_details={this.props.user.user_details} />
        })
        return(
            <div class='feeds_wrapper' >
                {map_notes}
            </div>
        )
    }
}