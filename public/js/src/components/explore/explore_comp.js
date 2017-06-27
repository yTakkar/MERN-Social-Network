import React from 'react'
import { connect } from 'react-redux'

import Explores from './explores_comp'
import explore_action from './explore_action'

@connect(store => {
    return{
        explore: store.explore
    }
})

export default class Explore extends React.Component{

    componentWillMount = () => {
        let { dispatch } = this.props
        dispatch(explore_action.get_explores())
    }

    render(){
        return(
            <div className="explore" >
                <Explores {...this.props} />
            </div>
        )
    }
}