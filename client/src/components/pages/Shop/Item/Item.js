import React from 'react';
import classes from '../../Pages.module.css';
import myClasses from './Item.module.css';
//{classes.CardThumbnail}
const item = props => (
    <div className={[myClasses.Item, props.class].join(' ')} key={props.id} onClick={props.clicked}>
        <div className={classes.CardThumbnail}>
            <img src={props.img} alt={props.alt}/>
        </div>
        <span className={["card-title", myClasses.CardTitle].join(' ')}>{props.title}</span>
        <span className={myClasses.Btn}>
            <span className={[myClasses.MaterialIcons].join(' ')}> add</span>
        </span>

        {/* <div><p>{props.desc}</p></div> */}
        <div><p><b>Price: ${props.price}</b></p></div>
    </div>
)

export default item;