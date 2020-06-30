import React from 'react';
import classes from './Background.module.scss';
// import myVid from '../../../assets/videos/myVid.mp4';
import myImg from '../../../assets/images/background2.jpg';

const background = () => {
    return (
    <div className={classes.BackgroundWrapper}>
        <img src={myImg} alt="crystal necklace"/>
    </div>)
}

export default background;