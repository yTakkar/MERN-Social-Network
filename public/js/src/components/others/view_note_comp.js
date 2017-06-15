import React from 'react'
import $ from 'jquery'
import axios from 'axios'

import * as notes_actions from '../../rest_actions/note_actions'
import * as note_int_actions from '../../rest_actions/note_int_actions'
import * as fn from '../../functions/functions'

export default class View_note extends React.Component{

    state = { 
        editing: false,
        liked: false
    }

    componentWillMount = () => {
        let { dispatch, note_id } = this.props
        dispatch(note_int_actions.LikedOrNot(note_id))
        dispatch(note_int_actions.likes(note_id))
    }

    componentWillReceiveProps = ({ note_int: { liked } }) => {
        this.setState({ liked })
    }

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

    like = () => {
        let { note_id: note, dispatch } = this.props
        $.ajax({
            url: '/api/like',
            data: { note },
            method: "POST",
            dataType: "JSON",
            success: data => {
                fn.notify({ value: "Liked" })
                dispatch(note_int_actions.liked(data))
                this.setState({ liked: true })
            }
        })
    }

    unlike = () => {
        let { note_id: note, dispatch } = this.props
        $.ajax({
            url: '/api/unlike',
            data: { note },
            method: "POST",
            dataType: "JSON",
            success: data => {
                fn.notify({ value: "Unliked" })
                dispatch(note_int_actions.unliked(note))
                this.setState({ liked: false })
            }
        })
    }

    render(){
        let { title, content, note_id, user, note_time, close, username, user_details: { id } } = this.props,
            { editing, liked } = this.state,
            session = $('#data').data('session'),
            getid = $('#profile_data').data('getid')

        return(
            <div class='view_note modal'>
                <div className="v_n_header modal_header">
                    <span>View note</span>
                </div>
                <div className="v_n_middle modal_middle">
                    <div className="v_n_info">
                        <img src={`/users/${user}/user.jpg`} alt=""/>
                        <div className="v_n_left">
                            <a href={`/profile/${user}`} className='v_n_username' >{username}</a>
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
                    <div className="v_n_int">
                        {
                            liked ? 
                            <span 
                                className={`v_n_unlike like_unlike ${editing ? 'like_unlike_disabled' : '' }`} 
                                onClick={this.unlike} 
                            ><i class="material-icons">favorite</i></span>
                            : 
                            <span 
                                className={`v_n_like like_unlike ${editing ? 'like_unlike_disabled' : ''}`} 
                                onClick={this.like} 
                            ><i class="material-icons">favorite_border</i></span>
                        }
                    </div>
                    {
                        fn.MeOrNot(getid) ?
                            editing ? <a 
                                        href="#" 
                                        className="v_n_edit sec_btn" 
                                        onClick={this.done_edit_note} 
                                    >Done editing</a>
                            : <a href="#" className="v_n_edit sec_btn" onClick={this.edit_note} >Edit note</a>
                        : null
                    }   
                    {
                        fn.MeOrNot(getid) ? 
                            <a 
                                href="#" 
                                className={`v_n_delete sec_btn ${editing ? 'sec_btn_disabled' : '' } `} 
                                onClick={this.delete_note} 
                            >Delete note</a> 
                        : null
                    }
                    <a href='#' className={`v_n_cancel pri_btn ${editing ? 'a_disabled' : '' } `} onClick={close}>Done</a>
                </div>
            </div>
        )
    }
}