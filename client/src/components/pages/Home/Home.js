import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import './Home.module.scss';
import classes from './Home.module.css';

class Sovereinty extends Component {
    componentDidMount() {
        
    }
    render () {
        let body = (
            <div className={["container", classes.container].join(' ')}>
                <div className="page-header text-center">
                    <h2>Sovereinty</h2>
                </div>
            </div>
        )

        return(
            <Auxiliary className='Home'>
                {body}
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Sovereinty);