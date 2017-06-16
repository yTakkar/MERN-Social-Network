import React from 'react'
import Like_items from './like_items_comp'

export default class Likes extends React.Component{
    render(){
        
        let { close, dispatch, likes } = this.props

        return(
            <div class='likes modal modal_big' >
                <div className="likes_header modal_header">
                        <span>Likes</span>
                    </div>
                    <div className="likes_middle modal_middle">
                        <div className="modal_main">
                            {
                                likes.map(ff => {
                                    return <Like_items key={ff.like_id} {...ff} dispatch={dispatch} />
                                })
                            }
                        </div>
                    </div>
                    <div className="likes_bottom modal_bottom">
                        <a href='#' className='likes_cancel pri_btn' onClick={e => close(e, "likes")} >Close</a>
                    </div>
            </div>
        )
    }
}