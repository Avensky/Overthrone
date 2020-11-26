import React from 'react'
import classes from '../../Pages.module.scss'
import myClasses from './Author.module.scss'
// import myImg from '../../../../assets/images/author.jpg';

// <figure className={classes.CardThumbnail}>
// <img src={myImg} alt="author cover"/>
// </figure>
const author = props => (
    <div className={myClasses.Author}>
  
        <div className={classes.CardTitle}>
            {props.author}
        </div>
        <div className={classes.CardDescription}>
            {props.content}<br /><br />
            {props.content2}<br /><br />
            {props.content3}<br />
        </div>
    </div>
)

export default author;