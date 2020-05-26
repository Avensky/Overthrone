import React from 'react'
import classes from '../../Pages.module.css'
import myClasses from './Character.module.css'
import myImg from '../../../../assets/images/character.jpg';

let assignedClasses = [classes.Card, myClasses.Character].join(' ')

const character = props => (
    <div className={assignedClasses}>
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