import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'

import * as follow_action from '../../rest_actions/follow_actions'
import * as notes_action from '../../rest_actions/note_actions'
import * as user_action from '../../rest_actions/user_actions'

import Banner from './profile_banner'
import Notes from './notes_comp'

@connect((store) => {
    return {
        follow: store.follow,
        notes: store.notes,
        user: store.user,
        note_int: store.note_int
    }
})

export default class Profile extends React.Component{

    componentWillMount = () => {
        let { props: { dispatch } } = this,
            get = $('#profile_data').data('getid'),
            session = $('#data').data('session')
        
        dispatch(notes_action.getNotes(get))
        dispatch(user_action.user_details(get))
        if(get != session){
            dispatch(follow_action.is_following(get))
        }
        dispatch(follow_action.get_followers(get))
        dispatch(follow_action.get_followings(get))
        dispatch(follow_action.get_profile_views(get))
    }

    render(){
        return(
            <div class='profile' >
                <Banner {...this.props} />
                <Notes {...this.props}  />
            </div>
        )
    }
}