import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../../../Pages.module.css';
import myClasses from './Item.module.css';
//{classes.CardThumbnail}
const item = props => (
    <div className={[myClasses.Item, props.class].join(' ')} key={props.id}>
        <Link to={'/shop/itemfull/' + props.id} key={item.id}>
            <div className={classes.CardThumbnail}>
                <img src={props.img} alt={props.alt}/>
            </div>
        </Link>
        <span className={["card-title", myClasses.CardTitle].join(' ')}>{props.title}</span>
        <span className={myClasses.Btn}>
            <span className={[myClasses.MaterialIcons].join(' ')} onClick={props.clicked}> add</span>
        </span>

        {/* <div><p>{props.desc}</p></div> */}
        <div><p><b>Price: ${props.price}</b></p></div>
    </div>
)

export default item;