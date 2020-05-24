import React from 'react';
import classes from'./Header.module.css';

const header = (props) => {
    return (
        <div className={classes.Header}>
            <div className={classes.HeaderLeft}>
                <h2>{props.children}</h2>
            </div>
            <div className={classes.HeaderRight}>
                <div className={classes.HeaderItem}>
                    <a href="...">+</a>
                <p className={classes.CardNewPostTitle}>{props.children}</p>
            </div>
        </div>
    </div>
    )
}

export default header;