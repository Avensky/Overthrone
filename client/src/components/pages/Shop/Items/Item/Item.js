import React from 'react';
import { Link } from 'react-router-dom';
// import classes from '../../../Pages.module.scss';
import myClasses from './Item.module.scss';
//{classes.CardThumbnail}
const item = props => (
    <div 
        key={props.id}
        className={["card", myClasses.Item, props.class].join(' ')}
    >

        
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
            <Link to={props.link}><i className="material-icons" onClick={props.clicked}>add</i></Link>
        </div>

        {/* Price */}
        <div className={myClasses.CardPrice}><p><b>${props.price}</b></p></div>
    </div>
)

export default item;