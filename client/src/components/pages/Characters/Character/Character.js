import React from 'react'
import classes from '../../Pages.module.scss'
import myClasses from './Character.module.scss'
//import { Link } from 'react-router-dom';
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
        
        {/*
        <div className={myClasses.List}>
            <Link to={'/characters/characterEdit/' + props.id}>
                <button 
                    className={["btn-warning", classes.Left].join(' ')}
                    onClick={props.editClick}
                >EDIT</button>
            </Link>
            <button 
                className={['btn-danger', classes.Right].join(' ')}
                onClick={props.deleteClick}
            >DELETE</button>            
        </div>
        */}

    </div>
)

export default character;