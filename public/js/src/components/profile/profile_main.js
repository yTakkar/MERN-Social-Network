import React from 'react'
import ReactDOM from 'react-dom'
import Profile from './profile_comp'
import { Provider } from 'react-redux'
import store from '../../store/store'

let elem = document.getElementById('profile_root')

if(elem){
    ReactDOM.render(
        <Provider store={store} >
            <Profile/> 
        </Provider>,
        elem
    )
}