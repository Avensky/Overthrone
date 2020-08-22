import React from 'react';
import myClasses from './Link.module.scss';
// import classes from '../../Pages.module.scss'


const link = (props) => (
    <div className={[myClasses.Card, myClasses.Link].join(' ')}>

            <h3>
                <span className={["fa", props.icon, 'my-' + props.mystyle].join(' ')} />
                <span> {props.link}</span>
            </h3>
            <p>
                { props.name        ? <strong>Name:          {props.name}<br /></strong>         : null }
                { props.displayName ? <strong>Display Name:   {props.displayName}<br /></strong>  : null }
                { props.username    ? <strong>Username:      {props.username}<br /></strong>     : null }
                { props.id          ? <strong>Id:            {props.id}<br /></strong>           : null }
                { props.email       ? <strong>Email:         {props.email}<br /></strong>        : null }
                { props.token       ? <strong>Token:         {props.token}<br /></strong>        : null }
                { props.password    ? <strong>Password:      {props.password}<br /></strong>     : null }
            </p>
            <a href={props.providerUnlink} className="btn btn-default">Unlink</a>
            <a href={props.provider} className={["btn", props.mystyle].join(' ')}>Connect {props.link}</a>
    
    </div>
)

export default link;