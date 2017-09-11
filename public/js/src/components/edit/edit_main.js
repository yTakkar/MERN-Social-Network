import React from 'react'
import ReactDOM from 'react-dom'
import Edit from './edit_comp'
import { Provider } from 'react-redux'
import store from '../../store/store'

let elem = document.getElementById('edit_root')

if(elem){
    ReactDOM.render(
        <Provider store={store} >
            <Edit/> 
        </Provider>,
        elem
    )
}
