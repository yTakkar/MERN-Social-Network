import React from 'react'
import ReactDOM from 'react-dom'
import Edit from './edit_comp'
import { Provider } from 'react-redux'
import store from '../../store/store'

if(/http:\/\/localhost:\d+\/edit/g.test(location.href)){
    ReactDOM.render(
        <Provider store={store} >
            <Edit/> 
        </Provider>,
        document.getElementById('edit_root')
    )
}