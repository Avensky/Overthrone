import React from 'react';
import myClasses from './Link.module.scss';
import classes from '../../Pages.module.scss'

const link = (props) => (
    <div className={[classes.Card, myClasses.Link].join(' ')}>

            <h3><span className="fa fa-user"></span> {props.link}</h3>
            <p>
                <strong>{props.id}</strong>: <br />
                <strong>{props.email}</strong>: <br />
                <strong>{props.password}</strong>:
            </p>
            <a href="/unlink/local" className="btn btn-default">Unlink</a>
            <a href="/connect/local" className="btn btn-default">Connect Local</a>
    
    </div>
)

export default link;