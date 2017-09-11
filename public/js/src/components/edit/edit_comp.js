import React from 'react'
import { connect } from 'react-redux'
import { FadeIn } from 'animate-components'
import $ from 'jquery'
import Notify from 'handy-notification'
import TimeAgo from 'handy-timeago'
import * as user_action from '../../rest_actions/user_actions'
import * as fn from '../../functions/functions'

@connect(store => {
    return {
        edit: store.user
    }
})

export default class Edit extends React.Component{

    state = {
        username: "",
        email: "",
        bio: "",
        file: ""
    }

     componentDidMount = () => this.props.dispatch(user_action.user_details($('#data').data('session')))

    componentWillReceiveProps = ({ edit: { user_details: { username, email, bio } } }) => this.setState({ username, email, bio })

     edit_profile = e => {
         e.preventDefault()
         let { username: susername, email: semail } = this.props.edit.user_details
         fn.edit_profile({ susername, semail })
     }

     update_value = (e, of) => {
         if(of == "username"){
             this.setState({ username: e.target.value })
         } else if(of == "email"){
             this.setState({ email: e.target.value })
         } else if(of == "bio"){
             this.setState({ bio: e.target.value })
         } else if(of == "file"){
             this.setState({ file: e.target.value })
         }
     }

     change_avatar = e => {
        this.update_value(e, "file")
        fn.change_avatar({ file: e.target.files[0] }) 
     }

     resend_vl = e => {
         e.preventDefault()
         fn.resend_vl()
     }

    render(){
        let { username, email, bio, file } = this.state,
            { id, joined } = this.props.edit.user_details,
            user_joined = TimeAgo(parseInt(joined))

        return(
            <div class='edit' data-username={username} >
                <FadeIn className="edit_animate" duration="300ms">
                    <div class="edit_info">
                        <img src={ id ? `/users/${id}/user.jpg` : "/images/spacecraft.jpg" } alt="" />
                        <span>{`@${username}`}</span>
                    </div>
                    <div className="eu_div">
                        <span class='edit_span'>Username</span>
                        <input 
                            type="text" 
                            class='e_username' 
                            placeholder='Username..' 
                            autoComplete='false' 
                            autoFocus 
                            spellCheck='false' 
                            value={username}
                            onChange={e => this.update_value(e, "username") }
                        />
                    </div>
                    <div className="ee_div">
                        <span class='edit_span'>Email</span>
                        <input 
                            type="email"   
                            class='e_email' 
                            placeholder='Email..' 
                            autoComplete='false' 
                            spellCheck='false' 
                            value={email} 
                            onChange={e => this.update_value(e, "email") }
                        />
                    </div>
                    <div className="eb_div">
                        <span class='edit_span'>Bio</span>
                        <textarea 
                            class="e_bio" 
                            id="" 
                            placeholder='Bio..' 
                            spellCheck='false' 
                            value={bio} 
                            onChange={e => this.update_value(e, "bio") }
                        ></textarea>
                    </div>
                    <div className="eb_btns">
                        <form class='avatar_form' method="post" encType='multipart/formdata' >
                            <input type="file" name="avatar" accept="image/*" value={file} id="avatar_file" onChange={this.change_avatar} />
                            <label 
                                for="avatar_file" 
                                class={`avatar_span sec_btn ${!fn.e_verified() ? "sec_btn_disabled" : ""}`}
                            >{fn.e_verified() ? "Change avatar" : "Verify email to change avatar"}</label>
                        </form>
                        <a href="#" className="pri_btn e_done" onClick={this.edit_profile} >Done editing</a>
                    </div>
                    <div className="e_joined">
                        <span>{`You joined Notes App ${user_joined}`}</span>
                    </div>
                    {
                        !fn.e_verified() ?
                            <div className="resend_vl_div" >
                                <a href='#' className="pri_btn resend_vl" onClick={this.resend_vl} >Resend verification link</a>
                            </div>
                        : null
                    }
                </FadeIn>

            </div>
        )
    }
}