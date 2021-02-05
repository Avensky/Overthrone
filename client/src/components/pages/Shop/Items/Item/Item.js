import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../../../Pages.module.scss';
import myClasses from './Item.module.scss';
import Image1 from '../../../../../assets/images/Image1.jpg'
import Image2 from '../../../../../assets/images/Image2.jpg'
import Image3 from '../../../../../assets/images/Image3.jpg'
import Image4 from '../../../../../assets/images/Image4.jpg'
import Image5 from '../../../../../assets/images/Image6.jpg'
import Image6 from '../../../../../assets/images/Image6.jpg'

//{classes.CardThumbnail}
const item = props => {
      
    return  (
    <div className={myClasses.Item} key={props.id}>
        {/* Image */}
        <div className={myClasses.CardThumbnail}>
            <Link to={'/shop/itemfull/' + props.id}>
                <img src={props.image} alt={props.alt}/>
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