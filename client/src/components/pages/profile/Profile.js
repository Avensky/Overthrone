import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import Link from './Link/Link';
import classes from '../Pages.module.scss';
import myClasses from './Profile.module.scss';

class Login extends Component {
    render () {
            let payload = this.props.payload
            let local, facebook, twitter, google = '';
            if (this.props.payload['local']) {
                local = (
                <Link 
                    id = {this.props.payload['_id']}
                    link = "Local"
                    email = {this.props.paylfoad['local'].email}
                    token = {this.props.payload['local'].token}
                    name = "Name"
                    icon = "fa-user"
                    mystyle = "auth-btn"
                />)
            }
            if (this.props.payload['facebook']){
                facebook = (
                    <Link 
                    id      = {this.props.payload['facebook'].id}
                    link    = "Facebook"
                    email   = {this.props.payload['facebook'].email}
                    token   = {this.props.payload['facebook'].token}
                    name    = {this.props.payload['facebook'].name}
                    icon    = "fa-facebook"
                    mystyle = "btn-primary"
                />                )
            }
            if (this.props.payload['twitter']){
                twitter = (
                    <Link 
                    id          = {this.props.payload['twitter'].id}
                    link        = "Twitter"
                    displayName = {this.props.payload['twitter'].displayName}                        token       = "token"
                    username    = {this.props.payload['twitter'].username}
                    token       = {this.props.payload['twitter'].token}
                    icon        = "fa-twitter"
                    mystyle     = "btn-info"
                />
                )
            }
            if (this.props.payload['google']){
                google =(
                    <Link 
                    id = {this.props.payload['google'].id}
                    link = "Google"
                    email = {this.props.payload['google'].email}
                    token = {this.props.payload['google'].token}
                    name = {this.props.payload['google'].name}
                    icon = "fa-google-plus"
                    mystyle = "btn-danger"
                />
                )
            }
            let body = (
                <Auxiliary>
                    <div className="container">
                        <div className="page-header text-center">
                        <h2><span className="fa fa-anchor"></span> Profile Page</h2>
            
                        </div>
                    </div>
                    <div className={[classes.Card, myClasses.Profile].join(' ')}>
                        {local}
                        {facebook}
                        {twitter}
                        {google}  
    
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
        payload:      state.auth.payload,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login);