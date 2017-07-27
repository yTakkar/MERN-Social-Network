import React from 'react'
import { render } from 'react-dom'
import Explore from './explore_comp'
import { Provider } from 'react-redux'
import store from '../../store/store'

let elem = document.getElementById("explore_root")

if(elem){
    render(
        <Provider store={store} >
            <Explore/>
        </Provider>,
        elem
    )
}