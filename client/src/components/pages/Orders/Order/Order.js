import React, {useState} from 'react';
import Auxiliary from '../../../../hoc/Auxiliary';
import myClasses from './Order.module.scss';
import Address from '../../profile/Address/Address';
import Summary from '../Summary/Summary';
import Item from '../Item/Item';
import PropTypes from 'prop-types';

const Order = props => {
    console.log('prop.items.map = ', props.items);
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
        );
    });

    let getDate = Date.parse(props.date);
    let dateObj = new Date(props.date);
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = months[dateObj.getMonth()] + ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear();
    
    let time;
    dateObj.getHours() > 11
        ? time = (dateObj.getHours() === 12 ? dateObj.getHours() : dateObj.getHours() -12 )+ ':' + dateObj.getMinutes() + 'pm'
        : time = (  dateObj.getHours() < 1 ? dateObj.getHours()+12 :dateObj.getHours()) + ':' + dateObj.getMinutes() + 'am';

    return (        
        <div className={myClasses.Order}>
            
            <p>Ordered on : {date}</p> 
            <p>at : {time}</p>
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
            <div className={myClasses.Items}>
                <h3>Items</h3>
                {items}
            </div>
        </div>
    );
};

Order.propTypes = {
    items: PropTypes.any,
    date: PropTypes.any,
    sessionid: PropTypes.any,
    name: PropTypes.string,
    phone: PropTypes.string,
    line1: PropTypes.string,
    line2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postal_code: PropTypes.string,
    email: PropTypes.string,
    amount_subtotal: PropTypes.string,
    amount_total: PropTypes.string,
};

export default Order; 