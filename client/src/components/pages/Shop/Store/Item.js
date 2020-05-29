import React from 'react';
import classes from '../../Pages.module.css';
import myClasses from './Item.module.css';

const Item = props => (
    <div className={myClasses.Item}>
        <figure className={classes.CardThumbnail}>
            <img src={props.img} alt="hat"/>
        </figure>

        <div>
            {props.title}
        </div>
        <div >{props.content}</div>
    </div>
)

export default Item;