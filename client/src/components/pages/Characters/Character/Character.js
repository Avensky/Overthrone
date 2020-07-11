import React from 'react'
import classes from '../../Pages.module.scss'
import myClasses from './Character.module.scss'
import { Link } from 'react-router-dom';
//import myImg from '../../../../assets/images/character.jpg';

const character = props => (
    <div 
        key={props.id}
        className={myClasses.Character}>
        {/*
        <figure className={classes.CardThumbnail}>
            <img src={props.img} alt="character image"/>
        </figure>
        */}
        <div className={classes.CardTitle}>
            {props.name} ({props.age})
        </div>
        <div className={classes.CardDescription}>{props.bio}</div>
        <button 
            className={classes.Edit}
            onClick={props.editClick}
        ><Link to={'/characters/characterEdit/' + props.id}>Edit</Link></button>
        <button 
            className={classes.Delete}
            onClick={props.click}
        >Delete</button>
    </div>
)

export default character;