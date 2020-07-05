import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import Link from './Link/Link';



class Login extends Component {
    render () {
        
        let body = (
            <Auxiliary>
                <div className="container">
                    <div className="page-header text-center">
                        <h1><span className="fa fa-anchor"></span> Profile Page</h1>
                        <a href="/auth/logout" className="btn btn-default btn-sm">Logout</a>
                    </div>

                    <Link 
                        id = "id"
                        link = "Local"
                        email = "Email"
                        name = "Name"
                        icon = "fa-user"
                    />

                    <Link 
                        id = "id"
                        link = "Facebook"
                        email = "Email"
                        token = "Token"
                        name = "name"
                        icon = "fa-facebook"
                    />
                    <Link 
                        id = "id"
                        link = "Twitter"
                        displayName = "displayName"
                        token = "token"
                        username = "username"
                        icon = "fa-twitter"
                    />
                    <Link 
                        id = "id"
                        link = "Google+"
                        email = "Email"
                        token = "token"
                        name = "name"
                        icon = "fa-google-plus"
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