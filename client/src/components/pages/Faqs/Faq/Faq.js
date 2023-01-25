import React from 'react';
import classes from '../../Pages.module.scss';
import myClasses from './Faq.module.scss';
import Auxiliary from '../../../../hoc/Auxiliary';

const assignedClasses = [myClasses.Faq].join(' ');

const faq = (props) => (
    <Auxiliary>
        <div className={assignedClasses}>
            <div className={classes.CardTitle}>
                <h5>{props.question}</h5>
            </div>
            <div className={classes.CardList}>
                {props.answer}
            </div>
        </div>
    </Auxiliary>
);

export default faq;
