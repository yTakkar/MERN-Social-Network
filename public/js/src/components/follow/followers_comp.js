import React from 'react'
import { FadeIn } from 'animate-components'
import Follower_items from './follower_items_comp'

export default class Followers extends React.Component{
    render(){
        let { dispatch, close, followers } = this.props
        
        return(
            <div class='followers modal modal_big' >
                <FadeIn duration="300ms" >
                    <div className="fer_header modal_header">
                        <span>Followers</span>
                    </div>
                    <div className="fer_middle modal_middle">
                        <div className="modal_main">
                            {
                                followers.map(ff => {
                                    return <Follower_items key={ff.follow_id} {...ff} dispatch={dispatch} />
                                })
                            }
                        </div>
                    </div>
                    <div className="fer_bottom modal_bottom">
                        <a href='#' className='fer_cancel pri_btn' onClick={e => close(e, "followers") } >Close</a>
                    </div>
                </FadeIn>
            </div>
        )
    }
}