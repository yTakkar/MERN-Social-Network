import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import * as notes_actions from '../../rest_actions/note_actions'

import Feeds from './Feeds_comp'
import Nothing from '../others/nothing_comp'
import Overlay from '../others/overlay_comp'
import Create_note from '../others/create_note_comp'

@connect(store => {
    return {
        notes: store.notes,
        user: store.user
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
        let { props: { dispatch } } = this,
            get = $('#data').data('session')
        dispatch(notes_actions.getFeeds())
    }

    render(){
        let { notes: { notes } } = this.props,  
            { creating_note } = this.state,
            no_of_feeds = (notes.length == 0) ? "No feeds" : (notes.length == 1) ? "1 feed" : `${notes.length} feeds`

        return(
            <div class='home' >
                <div className="home_info">
                    <span>{no_of_feeds}</span>
                    <a href='#' class='pri_btn' onClick={e => this.toggle_(e, "note") } >Create note</a>
                </div>
                { notes.length == 0 ? <Nothing mssg={'Looks like you"re new, Follow some to fill up your feed'} /> : <Feeds {...this.props} /> }

                { creating_note ? <Overlay/> : null }
                { creating_note ? <Create_note close={this.toggle_} /> : null }

            </div>
        )
    }
}