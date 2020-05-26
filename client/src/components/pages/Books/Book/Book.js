import React from 'react'
import classes from '../../Pages.module.css'
import myClasses from './Book.module.css'
import myImg from '../../../../assets/images/book2.jpg';

let assignedClasses = [classes.Card, myClasses.Book].join(' ')

const book = props => (
    <div className={assignedClasses}>
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