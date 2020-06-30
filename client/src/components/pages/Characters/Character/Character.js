import React from 'react'
import classes from '../../Pages.module.scss'
import myClasses from './Character.module.scss'
import myImg from '../../../../assets/images/character.jpg';

const character = props => (
    <div className={myClasses.Character}>
        <figure className={classes.CardThumbnail}>
            <img src={myImg} alt="character"/>
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

export default character;