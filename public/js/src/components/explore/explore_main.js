import React from 'react'
import { render } from 'react-dom'
import Explore from './explore_comp'
import { Provider } from 'react-redux'
import store from '../../store/store'

if(/http:\/\/localhost:\d+\/explore/g.test(location.href)){
    render(
        <Provider store={store} >
            <Explore/>
        </Provider>,
        document.getElementById("explore_root")
    )
}