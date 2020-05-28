import React from 'react';
import classes from '../../Pages.module.css';
import myClasses from './Item.module.css';

const Item = props => (
    <div className={myClasses.Item}>
        <figure className={classes.CardThumbnail}>
            <img src={props.img} alt="hat"/>
        </figure>

        <div className={classes.CardTitle}>
            {props.title}
        </div>
        <div className={classes.CardDescription}>{props.content}</div>
    </div>
)

export default Item;