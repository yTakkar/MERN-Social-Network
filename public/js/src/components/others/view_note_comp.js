import React from 'react'
import $ from 'jquery'
import * as notes_actions from '../../rest_actions/note_actions'
import * as fn from '../../functions/functions'

export default class View_note extends React.Component{

    state = { editing: false }

    delete_note = e => {
        let { note_id, dispatch, close } = this.props
        e.preventDefault()
        $.ajax({
            url: "/api/delete_note",
            method: "POST",
            data: { note: note_id },
            dataType: "JSON",
            success: data => {
                fn.notify({ value: data.mssg })
                dispatch(notes_actions.delete_note(note_id))
            }
        })
        close()
    }

    toggle_editing = e => {
        e.preventDefault()
        this.setState({ editing: !this.state.editing })
        $('.v_n_edit').blur()
    }

    edit_note = e => this.toggle_editing(e)

    done_edit_note = e => {
        this.toggle_editing(e)
        let title = $('.v_n_title').text(),
            content = $('.v_n_content').text(),
            { note_id, dispatch } = this.props
        
        if(title == "" || content == "" ){
            fn.notify({ value: "Fields are empty!!" })
            this.setState({ editing: true })
        } else {
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
                    console.log(data)
                    this.setState({ editing: false })
                    fn.notify({ value: data.mssg })
                    dispatch(notes_actions.edit_note({title, content, note_id}))
                }
            })
        }

    }

    render(){
        let { title, content, note_id, user, note_time, close, username, user_details: { id } } = this.props,
            { editing } = this.state,
            session = $('#data').data('session')

        return(
            <div class='view_note modal'>
                <div className="v_n_header modal_header">
                    <span>View note</span>
                </div>
                <div className="v_n_middle modal_middle">
                    <div className="v_n_info">
                        <img src={`/users/${user}/user.jpg`} alt=""/>
                        <div className="v_n_left">
                            <span className='v_n_username' >{username}</span>
                            <span className="v_n_time">{fn.time_ago(parseInt(note_time))}</span>
                        </div>
                    </div>
                    <span 
                        className='v_n_title' 
                        contentEditable={editing} 
                        spellCheck='false' 
                        suppressContentEditableWarning={true} 
                    >{fn.capitilize_first(title)}</span>
                    <span 
                        className={`v_n_content ${editing ? 'content_editor' : '' } `} 
                        contentEditable={editing} 
                        spellCheck='false' 
                        suppressContentEditableWarning={true} 
                    >{fn.capitilize_first(content)}</span>
                </div>
                <div className="v_n_bottom modal_bottom">
                    {
                        fn.MeOrNot() ?
                            editing ? <a 
                                        href="#" 
                                        className="v_n_edit sec_btn" 
                                        onClick={this.done_edit_note} 
                                    >Done editing</a>
                            : <a href="#" className="v_n_edit sec_btn" onClick={this.edit_note} >Edit note</a>
                        : null
                    }   
                    {
                        fn.MeOrNot() ? <a 
                                        href="#" 
                                        className={`v_n_delete sec_btn ${editing ? 'sec_btn_disabled' : '' } `} 
                                        onClick={this.delete_note} 
                                    >Delete note</a> : null
                    }
                    <a href='#' className={`v_n_cancel pri_btn ${editing ? 'a_disabled' : '' } `} onClick={close}>Done</a>
                </div>
            </div>
        )
    }
}