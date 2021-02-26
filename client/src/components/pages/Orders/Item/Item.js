import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../../Pages.module.scss';
import myClasses from './Item.module.scss';

//{classes.CardThumbnail}
const item = props => {
      
    return  (
    <div className={myClasses.Item} key={props.id}>        
        {/* Description */}
        <div className={myClasses.CardDescription}>
            <p className={myClasses.CardTitle}><b>{props.title}</b></p>
        
        </div>

        {/* Quantity */}
        <div className={myClasses.CardQuantity}>
            <p><b>{props.quantity}</b></p>
            {props.add === true
                ? <i className={["material-icons", myClasses.MaterialIcons, classes.noselect].join(' ')}onClick={props.clicked}>add</i>
                : null
            }
        </div>

        {/* Price */}
        <div className={["text-center", myClasses.CardPrice].join(' ')}><p><b>${props.price}</b></p></div>
    </div>
)}
export default item;