import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';


class Purchase extends Component {
    render () {
        let body = (
            <div className="container">
                <div className="page-header text-center">
                    <h1><span className="fa fa-anchor"></span> Profile Page</h1>
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

export default connect (mapStateToProps, mapDispatchToProps)(Purchase);