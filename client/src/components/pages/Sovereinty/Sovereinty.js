import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';


class Sovereinty extends Component {
    render () {
        let body = (
            <div className="container">
                <div className="page-header text-center">
                    <h3>Sovereinty</h3>
                </div>
            </div>
        )

        return(
            <Auxiliary>
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