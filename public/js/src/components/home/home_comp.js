import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import * as notes_actions from '../../rest_actions/note_actions'
import Feeds from './Feeds_comp'
import Nothing from '../others/nothing_comp'

@connect(store => {
    return {
        notes: store.notes,
        user: store.user
    }
})

export default class Home extends React.Component{

    componentWillMount = () => {
        let { props: { dispatch } } = this,
            get = $('#data').data('session')
        dispatch(notes_actions.getFeeds())
    }

    render(){
        let { notes: { notes } } = this.props,  
            no_of_feeds = (notes.length == 0) ? "No feeds" : (notes.length == 1) ? "1 feed" : `${notes.length} feeds`

        return(
            <div class='home' >
                <div className="home_info">
                    <span>{no_of_feeds}</span>
                </div>
                { notes.length == 0 ? <Nothing mssg={'Looks like you"re new, Follow some to fill up your feed'} /> : <Feeds {...this.props} /> }
            </div>
        )
    }
}