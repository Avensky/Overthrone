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
                <strong>{props.id}</strong>: <br />
                <strong>{props.email}</strong>: <br />
                <strong>{props.token}</strong>: <br />
                <strong>{props.name}</strong>: <br />
                <strong>{props.displayName}</strong>: <br />
                <strong>{props.username}</strong>: <br />
                <strong>{props.password}</strong>:
            </p>
            <a href="/unlink/local" className="btn btn-default">Unlink</a>
            <a href="/connect/local" className={["btn", props.mystyle].join(' ')}>Connect {props.link}</a>
    
    </div>
)

export default link;