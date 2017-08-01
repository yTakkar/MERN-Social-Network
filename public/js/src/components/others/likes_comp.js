import React from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Like_items from './like_items_comp'
import * as fn from '../../functions/functions'

export default class Likes extends React.Component{

    componentDidMount = () => fn.last_line_remover()

    render(){
        
        let { close, dispatch, likes } = this.props

        return(
            <div class='likes modal modal_big' >
                <FadeIn duration="300ms">
                    <div className="likes_header modal_header">
                        <span>Likes</span>
                    </div>
                    <Scrollbars style={{ height: 450 }} className="likes_middle modal_middle">
                        <div className="modal_main">
                            {
                                likes.map(ff => {
                                    return <Like_items key={ff.like_id} {...ff} dispatch={dispatch} />
                                })
                            }
                        </div>
                    </Scrollbars>
                    <div className="likes_bottom modal_bottom">
                        <a href='#' className='likes_cancel pri_btn' onClick={e => close(e, "likes")} >Close</a>
                    </div>
                </FadeIn>
            </div>
        )
    }
}