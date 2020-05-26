import React from 'react';
import myClasses from './Headline.module.css';

const headline = props => (
    <div className={myClasses.Headline}>
        <div className={myClasses.Headline}>{props.headline}</div>
    </div>
)

export default headline;