import React from 'react'
import ReactDOM from 'react-dom'
import Home from './home_comp'
import { Provider } from 'react-redux'
import store from '../../store/store'

let elem = document.getElementById('home_root')

if(elem){
    ReactDOM.render(
        <Provider store={store} >
            <Home/>
        </Provider>,
        elem
    )
} 