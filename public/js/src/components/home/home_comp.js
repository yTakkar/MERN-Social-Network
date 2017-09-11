import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import { FadeIn } from 'animate-components'
import * as fn from '../../functions/functions'
import * as notes_actions from '../../rest_actions/note_actions'

import Feeds from './Feeds_comp'
import Nothing from '../others/nothing_comp'
import Overlay from '../others/overlay_comp'
import Create_note from '../others/create_note_comp'
import End from '../others/end_comp'

@connect(store => {
    return {
        notes: store.notes,
        user: store.user,
        note_int: store.note_int
    }
})

export default class Home extends React.Component{

    state = { creating_note: false }

    toggle_ = (e, what) => {
        e ? e.preventDefault() : null
        if(what == "note"){
            this.setState({ creating_note: !this.state.creating_note })
        }
    }

    componentWillMount = () => {
        this.props.dispatch(notes_actions.getFeeds())
    }

    render(){
        let { notes: { notes } } = this.props,  
            { creating_note } = this.state,
            no_of_feeds = (notes.length == 0) ? "No feeds" : (notes.length == 1) ? "1 feed" : `${notes.length} feeds`

        return(
            <div class='home' >
                
                <FadeIn duration="300ms">
                    <div className="home_info">
                        <span>{no_of_feeds}</span>
                        <a 
                            href='#' 
                            class={`pri_btn ${!fn.e_verified() ? "a_disabled" : ""}`} 
                            onClick={e => this.toggle_(e, "note") } 
                        >{fn.e_verified() ? "Create note" : "Verify email to create note"}</a>
                    </div>
                </FadeIn>

                { notes.length == 0 ? <Nothing mssg={'Looks like you"re new, Follow some to fill up your feed'} /> : <Feeds {...this.props} /> }
                { notes.length != 0 ? <End/> : null }

                { creating_note ? <Overlay/> : null }
                { creating_note ? <Create_note close={this.toggle_} /> : null }

            </div>
        )
    }
}