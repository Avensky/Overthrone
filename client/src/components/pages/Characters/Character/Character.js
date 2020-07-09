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
            {props.name} ({props.age})
        </div>
        <div className={classes.CardDescription}>{props.bio}</div>
        <div className={classes.CardDetails}>
            By {props.age}
            on {props.relatives}
        </div>
    </div>
)

export default character;