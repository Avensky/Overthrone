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
                        password = "password"
                    />
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="well">
                                <h3><span className="fa fa-user"></span> Local</h3>
                                    <p>
                                        <strong>id</strong>: <br />
                                        <strong>email</strong>: <br />
                                        <strong>password</strong>:
                                    </p>
                                    <a href="/unlink/local" className="btn btn-default">Unlink</a>
                                    <a href="/connect/local" className="btn btn-default">Connect Local</a>
                            </div>
                        </div>
               
                        <div className="col-sm-6">
                            <div className="well">
                                <h3 className="text-primary"><span className="fa fa-facebook"></span> Facebook</h3>
                                    <p>
                                        <strong>id</strong>: <br />
                                        <strong>token</strong>: <br />
                                        <strong>email</strong>: <br />
                                        <strong>name</strong>: <br />
                                    </p>

                                    <a href="/unlink/facebook" className="btn btn-primary">Unlink</a>
             
                                    <a href="/connect/facebook" className="btn btn-primary">Connect Facebook</a>
          

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="well">
                                <h3 className="text-info"><span className="fa fa-twitter"></span> Twitter</h3>
                                    <p>
                                        <strong>id</strong>: <br />
                                        <strong>token</strong>: <br />
                                        <strong>display name</strong>: <br />
                                        <strong>username</strong>:
                                    </p>
                                    <a href="/unlink/twitter" className="btn btn-info">Unlink</a>
                                    <a href="/connect/twitter" className="btn btn-info">Connect Twitter</a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="well">
                                <h3 className="text-danger"><span className="fa fa-google-plus"></span> Google+</h3>
                                <p>
                                    <strong>id</strong>: <br />
                                    <strong>token</strong>: <br />
                                    <strong>email</strong>: <br />
                                    <strong>name</strong>: 
                                </p>
                                <a href="/unlink/google" className="btn btn-danger">Unlink</a>
                                <a href="/connect/google" className="btn btn-danger">Connect Google</a>
                            </div>
                        </div>
                    </div> 
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