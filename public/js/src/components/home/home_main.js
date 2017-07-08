import React from 'react'
import ReactDOM from 'react-dom'
import Home from './home_comp'
import { Provider } from 'react-redux'
import store from '../../store/store'

if(/^http:\/\/localhost:\d+\/#?$/g.test(location.href)){
    ReactDOM.render(
        <Provider store={store} >
            <Home/>
        </Provider>,
        document.getElementById('home_root')
    )
} 