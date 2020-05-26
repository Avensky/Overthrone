import React from 'react';
import classes from '../../Pages.module.css';
import myClasses from './Faq.module.css';
import Auxiliary from '../../../../hoc/Auxiliary';

let assignedClasses = [myClasses.Faq].join(' ')

const faq = props => (
    <Auxiliary>
        <div className={assignedClasses}>
            <div className={classes.CardTitle}>
                {props.question}
            </div>
            <div className={classes.CardList}>
                {props.answer}
            </div>
        </div>
    </Auxiliary>
)

export default faq;