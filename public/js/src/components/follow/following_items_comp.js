import React from 'react'
import axios from 'axios'
import $ from 'jquery'
import * as fn from '../../functions/functions'
import * as follow_action from '../../rest_actions/follow_actions'

export default class Follower_items extends React.Component{

    state = { is_following: false }

    componentWillMount = () => {
        axios.post('/api/is_following', { user: this.props.follow_to })
            .then(is => this.setState({ is_following: is.data }) )
    }

    follow = e => {
        e.preventDefault()
        let { follow_to, follow_to_username, dispatch } = this.props
        let obj = {
            user: follow_to,
            username: follow_to_username,    // only when update_followings=true
            dispatch,
            update_followings: fn.MeOrNot(),
            done: () => console.log('Followed')
        }
        fn.follow(obj)
        this.setState({ is_following: true })
    }

    unfollow = e => {
        e.preventDefault()
        let { follow_to, dispatch } = this.props
        let obj = {
            user: follow_to,
            dispatch,
            update_followings: fn.MeOrNot(),
            done: () => console.log('Unfollowed')
        }
        fn.unfollow(obj)
        this.setState({ is_following: false })
    }

    render(){
        let { follow_to, follow_to_username, follow_time } = this.props,
            session = $('#data').data('session'),
            { is_following } = this.state

        return(
            <div className="modal_items fer_items" data-user={follow_to} >
                <div className="modal_it_img">
                    <img src={`/users/${follow_to}/user.jpg`} />
                </div>
                <div className="modal_it_content">
                    <div className="modal_it_info">
                        <a href="#" class='modal_it_username' >{follow_to_username}</a>
                        <span class='modal_it_light' >{fn.time_ago(parseInt(follow_time))}</span>
                    </div>
                    <div className="modal_ff">
                        { 
                            follow_to == session ? 
                            <a href={`/profile/${follow_to}`} class='pri_btn follow' >Profile</a> : 
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