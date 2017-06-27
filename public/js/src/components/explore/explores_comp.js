import React from 'react'
import Explores_list from './explores_list_comp'
import Nothing from '../others/nothing_comp'

export default class Explores extends React.Component{
    render(){
        let { dispatch, explore: { explores } } = this.props
        
        let map_exp = explores.map(exp => {
            return <Explores_list key={exp.id} {...exp} dispatch={dispatch} />
        })

        return(
            <div className="explores" >
                { explores.length == 0 ? <Nothing mssg={"No one to explore"} /> : map_exp }
            </div>
        )
    }
}