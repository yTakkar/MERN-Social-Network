import React from 'react'
import Following_items from './following_items_comp'

export default class Followings extends React.Component{
    render(){
        let { dispatch, close, followings } = this.props

        return(
            <div class='followers modal modal_big' >
                <div className="fer_header modal_header">
                        <span>Followings</span>
                    </div>
                    <div className="fer_middle modal_middle">
                        <div className="modal_main">
                            {
                                followings.map(ff => {
                                    return <Following_items key={ff.follow_id} {...ff} dispatch={dispatch} />
                                })
                            }
                        </div>
                    </div>
                    <div className="fer_bottom modal_bottom">
                        <a href='#' className='fer_cancel pri_btn' onClick={e => close(e, "followings") } >Close</a>
                    </div>
            </div>
        )
    }
}