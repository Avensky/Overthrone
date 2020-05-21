import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';


class Login extends Component {
    render () {
        let body = (
            <body>
                <div className="container">
                    <div className="col-sm-6 col-sm-offset-3">
                        <h1><span className="fa fa-sign-in"></span> Signup</h1>
                        <form action="/signup" method="post">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" name="email" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" />
                            </div>

                            <button type="submit" className="btn btn-warning btn-lg">Signup</button>
                        </form>
                        <hr />
                        <p>Already have an account? <a href="/login">Login</a></p>
                        <p>Or go <a href="/">home</a>.</p>
                    </div>
                </div>
            </body>
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
        loading: state.auth.loading,
        error: state.auth.error,
        isLoggedIn: state.auth.user,
        loginRedirectPath: state.auth.loginRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login);