import React from 'react'
import $ from 'jquery'
import { FadeIn } from 'animate-components'
import * as fn from '../../functions/functions'
import TimeAgo from 'handy-timeago'
import Overlay from './overlay_comp'
import View_note from './view_note_comp'

export default class Note extends React.Component{

    state = { viewing: false }

    toggle_viewing = e => {
        e ? e.preventDefault() : null
        this.setState({ viewing: !this.state.viewing })
    }

    render(){
        let { title, content, note_id, user, note_time, dispatch, username } = this.props
        
        return(
            <div>
                <div class='note' data-note={note_id} onClick={this.toggle_viewing} >
                    <div className="note_header common_header">
                        <img src={`/users/${user}/user.jpg`} alt=""/>
                        <div className="note_h_left">
                            <span className="note_username">{username}</span>
                            <span className='note_time' >{TimeAgo(parseInt(note_time))}</span>
                        </div>
                    </div>
                    <div className="note_title">
                        <span>{fn.capitilize_first(title)}</span>
                    </div>
                    <div className="note_content">
                        <span>{fn.nameShortener(fn.capitilize_first(content), 500)}</span>
                    </div>
                </div>
                { this.state.viewing ? <Overlay/> : null }
                { 
                    this.state.viewing ? 
                        <View_note key={this.props.note_id} {...this.props} close={this.toggle_viewing} />
                    :
                         null 
                }
            </div>
        )
    }
}