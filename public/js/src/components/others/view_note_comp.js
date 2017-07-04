import React from 'react'
import $ from 'jquery'
import axios from 'axios'

import * as notes_actions from '../../rest_actions/note_actions'
import * as note_int_actions from '../../rest_actions/note_int_actions'
import * as fn from '../../functions/functions'

import Hidden_overlay from './hidden_overlay_comp'
import Likes from './likes_comp'

export default class View_note extends React.Component{

    state = { 
        editing: false,
        liked: false,
        view_likes: false
    }

    componentWillMount = () => {
        let { dispatch, note_id } = this.props
        dispatch(note_int_actions.LikedOrNot(note_id))
        dispatch(note_int_actions.likes(note_id))
    }

    componentWillReceiveProps = ({ note_int: { liked } }) => {
        this.setState({ liked })
    }

    toggle_ = (e, what) => {
        e ? e.preventDefault() : null
        if(what == "likes"){
            this.setState({ view_likes: !this.state.view_likes })
        } else if(what == "editing"){
            this.setState({ editing: !this.state.editing })
            $('.v_n_edit').blur()
        }
    }

    delete_note = e => {
        let { note_id, dispatch, close } = this.props
        e.preventDefault()
        fn.delete_note({ note_id, dispatch })
        close()
    }

    done_edit_note = e => {
        this.toggle_(e, "editing")
        let title = $('.v_n_title').text(),
            content = $('.v_n_content').text(),
            { note_id, dispatch } = this.props
        
        if(title == "" || content == "" ){
            fn.notify({ value: "Fields are empty!!" })
            this.setState({ editing: true })
        } else {
            let options = { title, content, note_id, dispatch, done: () => this.setState({ editing: false }) }
            fn.edit_note(options)
        }

    }

    like = () => {
        let { note_id: note, dispatch } = this.props
        let options = { note, dispatch, done: () => this.setState({ liked: true }) }
        fn.like(options)
    }

    unlike = () => {
        let { note_id: note, dispatch } = this.props
        let options = { note, dispatch, done: () => this.setState({ liked: false }) }
        fn.unlike(options)
    }

    render(){
        let { title, content, note_id, user, note_time, close, username, dispatch, user_details: { id }, note_int: { likes } } = this.props,
            { editing, liked, view_likes } = this.state,
            session = $('#data').data('session'),
            getid = $('#profile_data').data('getid')

        fn.description({ selector: $('.like_unlike'), text: liked ? "Unlike" : "Like" })

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
                                >
                                    <i class="material-icons">favorite</i>
                                </span>
                            : 
                                <span 
                                    className={`v_n_like like_unlike ${editing ? 'like_unlike_disabled' : ''}`} 
                                    onClick={this.like}
                                >
                                    <i class="material-icons">favorite_border</i>
                                </span>
                        }
                    </div>
                    <a 
                        href='#' 
                        className={`v_n_likes sec_btn ${editing ? 'sec_btn_disabled' : ''}`} 
                        onClick={e => this.toggle_(e, "likes") }     
                    >{`${likes.length} Likes`}</a>
                    {
                        fn.MeOrNot(getid) ?
                            editing ? <a 
                                        href="#" 
                                        className="v_n_edit sec_btn" 
                                        onClick={this.done_edit_note} 
                                    >Done editing</a>
                            : <a href="#" className="v_n_edit sec_btn" onClick={e => this.toggle_(e, "editing") } >Edit note</a>
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

                { view_likes ? <Hidden_overlay/> : null }
                { view_likes ? <Likes dispatch={dispatch} close={this.toggle_} likes={likes} /> : null }

            </div>
        )
    }
}