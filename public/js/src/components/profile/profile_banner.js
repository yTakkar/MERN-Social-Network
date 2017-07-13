import React from 'react'
import $ from 'jquery'
import * as fn from '../../functions/functions'
import * as follow_action from '../../rest_actions/follow_actions'
import { FadeIn, Pulse } from 'animate-components'

import Create_note from '../others/create_note_comp'
import Overlay from '../others/overlay_comp'
import Followers from '../follow/followers_comp'
import Followings from '../follow/followings_comp'

export default class Banner extends React.Component{

    state = { 
        creating_note: false,
        is_following: false,
        view_followers: false,
        view_followings: false
    }

    toggle_ = (e, what) => {
        e ? e.preventDefault() : null
        if(what == "note"){
            this.setState({ creating_note: !this.state.creating_note })
        } else if(what == "followers"){
            this.setState({ view_followers: !this.state.view_followers })
        } else if(what == "followings"){
            this.setState({ view_followings: !this.state.view_followings })
        }
    }

    componentWillReceiveProps = ({ follow: { is_following } }) => {
        this.setState({ is_following })
    }

    follow = e => {
        e.preventDefault()
        let obj = {
            user: $('#profile_data').data('getid'),
            dispatch: this.props.dispatch,
            update_followers: true,
            done: () => this.setState({ is_following: true })
        }
        fn.follow(obj)
    }

    unfollow = e => {
        e.preventDefault()
        let obj = {
            user: $('#profile_data').data('getid'),
            dispatch: this.props.dispatch,
            update_followers: true,
            done: () => this.setState({ is_following: false })
        }
        fn.unfollow(obj)
    }

    render(){
        let { notes: {notes}, user: { user_details: { username, id, email, bio }}, follow: { followers, followings, profile_views } } = this.props,
            getid = $('#profile_data').data('getid'),
            no_of_notes = notes.length,
            no_of_followers = followers.length,
            no_of_followings = followings.length,
            no_of_profile_views = profile_views.length,
            { is_following, creating_note, view_followers, view_followings } = this.state

        return(
            <div>
                <div class='user_banner'>

                    <div className="profile_img_div">
                        <img src={ id ? `/users/${id}/user.jpg` : '/images/spacecraft.jpg' } alt="Your profile"/>
                    </div>

                    <div className="user_info">
                        <a href={`/profile/${id}`} className="user_main_link">{username}</a>
                        <span className="user_no_notes">{ email }</span>
                        <div className="user_bio">
                            <span>{bio}</span>
                        </div>
                        <hr/>
                        <div className="user_stats">
                            <div class="stat_post stat_disabled">
                                <span class="stat_hg">{no_of_notes}</span>
                                <span class="stat_nhg">Notes</span>
                            </div>
                            <div class="stat_followers" onClick={() => this.toggle_(null, "followers") } >
                                <span class="stat_hg">{no_of_followers}</span>
                                <span class="stat_nhg">Followers</span>
                            </div>
                            <div class="stat_followings" onClick={() => this.toggle_(null, "followings") } >
                                <span class="stat_hg">{no_of_followings}</span>
                                <span class="stat_nhg">Followings</span>
                            </div>
                            <div class="stat_views stat_disabled ">
                                <span class="stat_hg">{no_of_profile_views}</span>
                                <span class="stat_nhg">Profile views</span>
                            </div>
                        </div>
                    </div>

                    <div className="user_buttons">
                        {
                            fn.MeOrNot(getid) ? 
                                <a 
                                    href="#" 
                                    className={`create_note_btn pri_btn ${!fn.e_verified() ? "a_disabled" : ""}`} 
                                    id=""  
                                    onClick={e => this.toggle_(e, "note") }
                                >{fn.e_verified() ? "Create note" : "Verify email to create note"}</a> 
                            : 
                            (is_following) ? 
                                <a href="#" className="unfollow pri_btn" onClick={this.unfollow} >Unfollow</a> 
                            :
                                <a href="#" className="follow pri_btn" onClick={this.follow} >Follow</a>
                        }
                    </div>

                </div>

                { (creating_note || view_followers || view_followings ) ? <Overlay/> : null }

                { creating_note ? 
                    <FadeIn duration="50ms" >
                        <Create_note dispatch={this.props.dispatch} close={this.toggle_} /> 
                    </FadeIn>
                : null }

                { view_followers ? 
                    <FadeIn duration="50ms" >
                        <Followers dispatch={this.props.dispatch} followers={this.props.follow.followers} close={this.toggle_} /> 
                    </FadeIn>
                : null }

                { view_followings ? 
                    <FadeIn duration="50ms" >
                        <Followings dispatch={this.props.dispatch} followings={this.props.follow.followings} close={this.toggle_} /> 
                    </FadeIn>
                : null }

            </div>
        )
        
    }
}