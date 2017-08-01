import React from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Following_items from './following_items_comp'

export default class Followings extends React.Component{
    render(){
        let { dispatch, close, followings } = this.props

        return(
            <div class='followers modal modal_big' >
                <FadeIn duration="300ms">
                    <div className="fer_header modal_header">
                        <span>Followings</span>
                    </div>
                    <Scrollbars style={{ height: 450 }} className="fer_middle modal_middle">
                        <div className="modal_main">
                            {
                                followings.map(ff => {
                                    return <Following_items key={ff.follow_id} {...ff} dispatch={dispatch} />
                                })
                            }
                        </div>
                    </Scrollbars>
                    <div className="fer_bottom modal_bottom">
                        <a href='#' className='fer_cancel pri_btn' onClick={e => close(e, "followings") } >Close</a>
                    </div>
                </FadeIn>
            </div>
        )
    }
}