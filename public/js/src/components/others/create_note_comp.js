import React from 'react'
import $ from 'jquery'
import Notify from 'handy-notification'
import { FadeIn } from 'animate-components'
import * as fn from '../../functions/functions'
import * as notes_actions from '../../rest_actions/note_actions'

export default class Create_note extends React.Component{

    addNote = e => {
        let { dispatch, close } = this.props
        e.preventDefault()
        $.ajax({
            url: "/api/create_note",
            method: "POST",
            data: {
                title: $('.c_n_middle input[type="text"]').val(),
                content: $('.c_n_middle textarea').val()
            },  
            dataType: "JSON",
            success: data => {
                Notify({ value: data.mssg })
                dispatch ? dispatch(notes_actions.updateNotes(data)) : null
            }
        })
        close(e, "note")
    }

    render(){
        let { close } = this.props
        return(
            <div class='create_note modal' onSubmit={this.addNote} >
                <FadeIn duration="300ms" >
                    <form>
                        <div className="c_n_header modal_header">
                            <span>Create a note</span>
                        </div>
                        <div className="c_n_middle modal_middle">
                            <input type="text" placeholder='Title..' required spellCheck="false" autoComplete="false" autoFocus />
                            <textarea placeholder='Your note..' required spellCheck='false' autoComplete='false' ></textarea>
                        </div>
                        <div className="c_n_bottom modal_bottom">
                            <a href='#' className='c_n_cancel sec_btn' onClick={(e) => close(e, "note") } >Cancel</a>
                            <input type="submit" className='c_n_add pri_btn' value='Add note' />
                        </div>
                    </form>
                </FadeIn>
            </div>
        )
    }
}