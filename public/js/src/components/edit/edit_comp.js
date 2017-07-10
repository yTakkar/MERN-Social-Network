import React from 'react'
import { connect } from 'react-redux'
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

     componentDidMount = () => {
         this.props.dispatch(user_action.user_details($('#data').data('session')))
    }

    componentWillReceiveProps = ({ edit: { user_details: { username, email, bio } } }) => {    
        this.setState({ username, email, bio })
    }

     edit_profile = e => {
        e.preventDefault()
        let username = $('.e_username').val(),
            email = $('.e_email').val(),
            bio = $('.e_bio').val(),
            button = $('.e_done')

        button.addClass('a_disabled').text('Processing..').blur()

        if(username == ""){
            Notify({ value: "Username must not be empty!" })
        } else if(email == ""){
            Notify({ value: "Email must not be empty!" })
        } else {
            $.ajax({
                url: "/api/edit_profile",
                method: "POST",
                data: {
                    username,
                    email, 
                    bio
                },
                dataType: "JSON",
                success: data => {
                    console.log(data)
                    Notify({ value: (data.mssg.length > 0) ? data.mssg.slice(0, 1) : data.mssg })
                }
            })
        }
        button.removeClass('a_disabled').text('Done Editing').blur()

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
        let { name, size, type } = e.target.files[0],
            allowed = ['image/png', 'image/jpeg', 'image/gif']
        
        if(!allowed.includes(type)){
            Notify({ value: "Only images allowed!" })
        } else {
            let form = new FormData()
            form.append('avatar', e.target.files[0])
            $.ajax({
                url: "/api/change_avatar",
                method: "POST",
                processData: false,
                contentType: false,
                data: form,
                dataType: "JSON",
                success: data => {
                    console.log(data)
                    Notify({ value: data.mssg, done: location.href })
                }
            })
        }
            
     }

    render(){
        let { username, email, bio, file } = this.state,
            { id, joined } = this.props.edit.user_details,
            user_joined = TimeAgo(parseInt(joined))

        return(
            <div class='edit' data-username={username} >
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
                        <input type="file" name="avatar" value={file} id="avatar_file" onChange={this.change_avatar} />
                        <label for="avatar_file" class="avatar_span sec_btn">Change avatar</label>
                    </form>
                    <a href="#" className="pri_btn e_done" onClick={this.edit_profile} >Done Editing</a>
                </div>
                <div className="e_joined">
                    <span>{`You joined Notes App ${user_joined}`}</span>
                </div>
            </div>
        )
    }
}