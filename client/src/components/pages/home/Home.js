import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from '../Pages.module.css'
class Login extends Component {
    render () {
        let body = (
            <div className={classes.Jumbotron}>
                <h1><span className="fa fa-lock"></span> Authentication</h1>
                <p>Login or Register with:</p>
                <a href="/login"            className="btn btn-default"><span className="fa fa-user">       </span> Local Login</a>
                <a href="/signup"           className="btn btn-default"><span className="fa fa-user">       </span> Local Signup</a>
                <a href="/auth/facebook"    className="btn btn-primary"><span className="fa fa-facebook">   </span> Facebook</a>
                <a href="/auth/twitter"     className="btn btn-info"   ><span className="fa fa-twitter">    </span> Twitter</a>
                <a href="/auth/google"      className="btn btn-danger" ><span className="fa fa-google-plus"></span> Google+</a>
            </div>
        )

        return(
            <div className={classes.Container}>
                {body}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isLoggedIn: state.auth.user,
    };
};

export default connect (mapStateToProps)(Login);