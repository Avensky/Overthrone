import React from 'react'
import classes from '../../Pages.module.scss'
import myClasses from './Character.module.scss'
import myImg from '../../../../assets/images/character.jpg';

const character = props => (
    <div className={myClasses.Character}>
        {/*
        <figure className={classes.CardThumbnail}>
            <img src={props.img} alt="character image"/>
        </figure>
        */}
        <div className={classes.CardTitle}>
            {props.name} ({props.age})
        </div>
        <div className={classes.CardDescription}>{props.bio}</div>
        <button className={classes.Edit}>Edit</button>
        <button 
            className={classes.Delete}
            onClick={props.click}
        >Delete</button>
    </div>
)

export default character;