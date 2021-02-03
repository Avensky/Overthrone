import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../../../Pages.module.scss';
import myClasses from './Item.module.scss';
import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item6.jpg'
import Item6 from '../../images/item6.jpg'

//{classes.CardThumbnail}
const item = props => (
    <div className={myClasses.Item} key={props.id}>
        {/* Image */}
        <div className={myClasses.CardThumbnail}>
            <Link to={'/shop/itemfull/' + props.id}>
                <img src={props.img} alt={props.alt}/>
            </Link>
        </div>
        
        {/* Description */}
        <div className={myClasses.CardDescription}>
            <p className={myClasses.CardTitle}><b>{props.title}</b></p>
            <p>{props.desc}</p>
        </div>

        {/* Quantity */}
        <div className={myClasses.CardQuantity}>
            <p><b>{props.quantity}</b></p>
            <i className={["material-icons", myClasses.MaterialIcons, classes.noselect].join(' ')}onClick={props.clicked}>add</i>
        </div>

        {/* Price */}
        <div className={["text-center", myClasses.CardPrice].join(' ')}><p><b>${props.price}</b></p></div>
    </div>
)

export default item;