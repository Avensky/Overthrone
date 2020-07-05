import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import Link from './Link/Link';
import classes from '../Pages.module.scss';
import myClasses from './Profile.module.scss';

class Login extends Component {
    render () {
        
        let body = (
            <Auxiliary>
                <div className="container">
                    <div className="page-header text-center">
                    <h2><span className="fa fa-anchor"></span> Profile Page</h2>
        
                    </div>
                </div>
                <div className={[classes.Card, myClasses.Profile].join(' ')}>
                    <Link 
                        id = "id"
                        link = "Local"
                        email = "Email"
                        name = "Name"
                        icon = "fa-user"
                        style = "auth-btn"
                    />

                    <Link 
                        id = "id"
                        link = "Facebook"
                        email = "Email"
                        token = "Token"
                        name = "name"
                        icon = "fa-facebook"
                        style = "btn-primary"
                    />
                    <Link 
                        id = "id"
                        link = "Twitter"
                        displayName = "displayName"
                        token = "token"
                        username = "username"
                        icon = "fa-twitter"
                        style = "btn-info"
                    />
                    <Link 
                        id = "id"
                        link = "Google+"
                        email = "Email"
                        token = "token"
                        name = "name"
                        icon = "fa-google-plus"
                        style = "btn-danger"
                    />

                </div>                  
                </Auxiliary>
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

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login);