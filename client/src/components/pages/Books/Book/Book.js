import React from 'react'
import classes from '../../Pages.module.css'
import myImg from '../../../../assets/images/book2.jpg';

const book = props => (
    <div className={classes.Card}>
        <figure className={classes.CardThumbnail}>
            <img src={myImg} alt="book cover"/>
        </figure>
        <div className={classes.CardTitle}>
            {props.title}
        </div>
        <div className={classes.CardDescription}>{props.content}</div>
        <div className={classes.CardDetails}>
            By {props.author}
            on {props.published}
        </div>
    </div>
)

export default book;