import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import Character from './Charcter/Character';


class Characters extends Component {
    render () {
        let body = (
            <div className="container">
                <div className="page-header text-center">
                    <h1><span className="fa fa-anchor"></span> Character's Page</h1>
                    <a href="/auth/logout" className="btn btn-default btn-sm">Logout</a>
                </div>
            </div>
        )

        return(
            <Auxiliary>
                {body}
                <Character 
                    title="Overthrown"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    author="suzie"
                    published="12-02-1990"
                />
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

export default connect (mapStateToProps, mapDispatchToProps)(Characters);