import React, {useState} from 'react'
import Auxiliary from '../../../../hoc/Auxiliary'

const Order = props => {
    return (        
        <div>
            {props.date ? <strong> {props.date }<br /></strong>:null}

        </div>
    )
}

export default Order 