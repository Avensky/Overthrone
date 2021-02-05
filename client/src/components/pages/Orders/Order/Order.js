import React, {useState} from 'react'
import Auxiliary from '../../../../hoc/Auxiliary'
import myClasses from './Order.module.scss'
import Address from '../../profile/Address/Address'
import Summary from '../Summary/Summary'
import Item from '../../Shop/Items/Item/Item'

const Order = props => {
    let items = props.items.map(item=> {
        return(
            <Item
                img         = {item.img}
                id          = {item.price.id}
                key         = {item.id}
                alt         = {item.description}
                title       = {item.description}
                link        = {"/shop/"}
                to          = "/"
         //       clicked     = {() => addToCart(item.id)}
                add         = {false}
                desc        = {item.desc}
                price       = {item.price.unit_amount/100*item.quantity}
                quantity    = {item.quantity}
            />
        )
    })

    return (        
        <div className={myClasses.Order}>
            <p>Ordered on : {props.date}</p><br />
            <p>Order ID : {props.sessionid}</p>
            <div className={myClasses.bigbox}>
                <div className={myClasses.box}>
                    <Address 
                        link            = 'Shipping Address'
                        name            = {props.name}
                        phone           = {props.phone}
                        address         = {props.line1}
                        address2        = {props.line2}
                        city            = {props.city}
                        state           = {props.state}
                        postal_code     = {props.postal_code}
                        email           = {props.email}
                    
                    />
                </div>
                <div className={myClasses.box}>
                    <Summary 
                        link        = 'Order Summary'
                        amount_subtotal = {props.amount_subtotal}
                        amount_total = {props.amount_total}
                    />
                </div>
            </div>
            <div className={items}>
                <p>Items:  </p>
                {items}
            </div>
        </div>
    )
}

export default Order 