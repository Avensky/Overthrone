import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../../../Pages.module.css';
import myClasses from './Item.module.css';
//{classes.CardThumbnail}
const item = props => (
    <div 
        key={props.id}
        className={["card", classes.Item, props.class].join(' ')} 
        key={props.id}
    >

         <div className={['card-image', classes.CardThumbnail].join(' ')}>
            <Link to={'/shop/itemfull/' + props.id}>
                <img src={props.img} alt={props.alt}/>
            </Link>
        </div>
        <div className={classes.CardContent}>
            <span className={myClasses.CardTitle}>{props.title}</span>
            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={props.clicked}><i className="material-icons">add</i></span>
            
            {/* 
            <span className={myClasses.Btn}>
                <span className={[myClasses.MaterialIcons].join(' ')} onClick={props.clicked}> add</span>
            </span>

            {/* <div><p>{props.desc}</p></div> 
            */}
            <div><p><b>Price: ${props.price}</b></p></div>
        </div>
    </div>
)

export default item;