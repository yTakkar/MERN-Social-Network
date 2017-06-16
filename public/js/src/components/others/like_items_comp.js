import React from 'react'
import axios from 'axios'
import $ from 'jquery'

import * as fn from '../../functions/functions'
import * as follow_action from '../../rest_actions/follow_actions'

export default class Like_items extends React.Component{

    state = { is_following: false }

    componentWillMount = () => {
        axios.post('/api/is_following', { user: this.props.like_by })
            .then(is => this.setState({ is_following: is.data }) )
    }

    follow = e => {
        e.preventDefault()
        let { like_by, like_by_username, dispatch } = this.props,
            getid = $('#profile_data').data('getid'),
            user = getid ? getid : null,
            obj = {
                user: like_by,
                username: like_by_username,    // only when update_followings=true
                dispatch,
                update_followings: fn.MeOrNot(user),
                done: () => this.setState({ is_following: true })
            }
        fn.follow(obj)
    }

    unfollow = e => {
        e.preventDefault()
        let { like_by, dispatch } = this.props,
            getid = $('#profile_data').data('getid'),
            user = getid ? getid : null,
            obj = {
                user: like_by,
                dispatch,
                update_followings: fn.MeOrNot(user),
                done: () => this.setState({ is_following: false })
            }
        fn.unfollow(obj)
    }

    render(){
        let { like_by, like_by_username, like_time } = this.props,
            session = $('#data').data('session'),
            { is_following } = this.state

        return(
            <div className="modal_items fer_items" data-user={like_by} >
                <div className="modal_it_img">
                    <img src={`/users/${like_by}/user.jpg`} />
                </div>
                <div className="modal_it_content">
                    <div className="modal_it_info">
                        <a href={`/profile/${like_by}`} class='modal_it_username' >{like_by_username}</a>
                        <span class='modal_it_light' >{fn.time_ago(parseInt(like_time))}</span>
                    </div>
                    <div className="modal_ff">
                        { 
                            like_by == session ? 
                            <a href={`/profile/${like_by}`} class='pri_btn follow' >Profile</a> : 
                            is_following ? 
                            <a href="#" class='pri_btn unfollow' onClick={this.unfollow} >Unfollow</a> : 
                            <a href="#" class='pri_btn follow' onClick={this.follow} >Follow</a> 
                        }
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}