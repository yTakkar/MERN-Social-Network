import React from 'react'
import ReactDOM from 'react-dom'
import Profile from './profile_comp'
import { Provider } from 'react-redux'
import store from '../../store/store'

if(/http:\/\/localhost:\d+\/profile\/\d+/g.test(location.href)){
    ReactDOM.render(
        <Provider store={store} >
            <Profile/> 
        </Provider>,
        document.getElementById('profile_root')
    )
}