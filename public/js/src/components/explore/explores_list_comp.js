import React from 'react'
import axios from 'axios'

import * as fn from '../../functions/functions'
import Nothing from '../others/nothing_comp'

export default class Explores_list extends React.Component{
    
    state = { 
        is_following: false,
        followers: 0
    }

    componentWillMount = () => {
        let { dispatch, id } = this.props
        axios.post('/api/is_following', { user: id }).then(is => this.setState({ is_following: is.data }) )
        axios.post('/api/get_followers', { user: id }).then(ff => this.setState({ followers: ff.data.length }) )
    }

    follow = e => {
        e.preventDefault()
        let { id, dispatch } = this.props,
            obj = {
                user: id,
                dispatch,
                done: () => this.setState({ is_following: true })
            }
        fn.follow(obj)
    }

    unfollow = e => {
        e.preventDefault()
        let { id, dispatch } = this.props,
            obj = {
                user: id,
                dispatch,
                done: () => this.setState({ is_following: false })
            }
        fn.unfollow(obj)
    }

    render(){
        let { id, username, email }  = this.props,
            { is_following, followers } = this.state

        return(
            <div className="explores_list" >
                <div className="exl_main">
                    <img src={`/users/${id}/user.jpg`} />
                    <div className="exl_content">
                        <a href={`/profile/${id}`} className="exl_username" >{username}</a>
                        <div className="exl_desc">
                            <span className="exl_email">{email}</span>
                            <span className="exl_desc_sep">•</span>
                            <span className="exl_followers">{followers} followers</span>
                        </div>
                    </div>
                </div>
                <div className="exl_ff">
                    {
                        is_following ?
                            <a href="#" className="pri_btn unfollow exl_unfollow" onClick={this.unfollow} >Unfollow</a> 
                        :   
                            <a href="#" className="pri_btn follow exl_follow" onClick={this.follow} >Follow</a>
                    }
                </div>
            </div>
        )
    }
}
