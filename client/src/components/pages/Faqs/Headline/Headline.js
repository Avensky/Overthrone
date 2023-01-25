import React from 'react';
import myClasses from './Headline.module.scss';

const headline = (props) => (
    <div className={myClasses.Headline}>
        <div className={myClasses.Headline}>{props.headline}</div>
    </div>
);

export default headline;
