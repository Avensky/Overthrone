import React from 'react'
import classes from '../../Pages.module.scss'
import myClasses from './Author.module.scss'
import myImg from '../../../../assets/images/author.jpg';


const author = props => (
    <div className={myClasses.Author}>
        <figure className={classes.CardThumbnail}>
            <img src={myImg} alt="author cover"/>
        </figure>
        <div className={classes.CardTitle}>
            {props.author}
        </div>
        <div className={classes.CardDescription}>{props.content}</div>
    </div>
)

export default author;