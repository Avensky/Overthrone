import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from '../Pages.module.scss';
import myClasses from './Connect.module.scss';
import Auxiliary from '../../../hoc/Auxiliary';
import * as actions from '../../../store/actions/index';

const Connect = (props) => {
  const [email, setEmail] = useState({
    value: '',
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  });

  const [password, setPassword] = useState({
    value: '',
    validation: {
      required: true,
      minLength: 6,
    },
    valid: false,
    touched: false,
  });

  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    validation: {
      required: true,
      minLength: 6,
    },
    valid: false,
    touched: false,
  });

  const [authLogin, setAuthLogin] = useState(true);

  const loginToggleHandler = () => {
    setAuthLogin(true);
  };

  const registerToggleHandler = () => {
    setAuthLogin(false);
  };

  const inputChangedHandler = (event, controlName) => {

  };

  const loginHandler = () => {
    //    event.preventDefault();
    props.onAuth(
      email.value,
      password.value,
      authLogin,
    );
  };

  const newUserHandler = () => {
    // event.preventDefault();
    const pic = 'https://lh3.googleusercontent.com/a-/AOh14Gjyf9dG_HQji_W8Js4Kps0_nxl5RyobebP6Nqeg';
    props.onNewUser(
      email.value,
      password.value,
      //            state.controls.picture.value,
      // pic
    );
  };

  const form = (
        <form action="/connect/local"
        method="post">
            <input
                type="text"
                name="email"
                onChange={(event) => inputChangedHandler(event, 'email')}
                placeholder="Email Address"
                className={myClasses.AuthInput}
            />
            <input
                type="password"
                name="password"
                onChange={(event) => inputChangedHandler(event, 'password')}
                placeholder="Password"
                className={myClasses.AuthInput}
            />

        <p className="text-left">Forgot Password?</p>

            <button
                // onClick={loginHandler}
                className={[myClasses.Btn, myClasses.AuthBtn, 'auth-btn'].join(' ')}
                type="submit"
            >
                <div className={myClasses.BtnDiv}>
                    <span className="fa fa-user"></span> Connect Local
                </div>
            </button>
        </form>
  );

  let selected; let
    unselected = myClasses.AuthToggle;

  if (authLogin === false) {
    selected = myClasses.AuthToggle;
    unselected = [myClasses.AuthToggle, myClasses.AuthSelected].join(' ');
  }

  if (authLogin === true) {
    selected = [myClasses.AuthToggle, myClasses.AuthSelected].join(' ');
    unselected = myClasses.AuthToggle;
  }

  return <>
            <div className='container'>
                <div className={['page-header', 'text-center'].join(' ')}>
                    <a href='/shop' ><h2>Join the Team!</h2></a>
                </div>
            </div>
            <div className={[classes.Card, myClasses.Auth].join(' ')}>
                <div className={myClasses.AuthNav}>
                    <button
                        onClick={loginToggleHandler}
                        className={selected}
                    ><h2><span className="fa fa-sign-in" /> Connect Local</h2>
                    </button>

                    <button
                        onClick={registerToggleHandler}
                        className={[unselected, 'disabeled'].join(' ')}
                    >
                    </button>
                </div>

            {form}
            <div className={classes.CardTitle}>Or continue with:</div>
            <button className={[myClasses.Btn, 'btn-primary'].join(' ')}>
                <a href="/auth/facebook"><span className="fa fa-facebook" /> Facebook</a>
            </button>
            <button className={[myClasses.Btn, 'btn-info'].join(' ')}>
                <a href="/auth/twitter"><span className="fa fa-twitter" /> Twitter</a>
            </button>
            <button className={[myClasses.Btn, 'btn-danger'].join(' ')}>
                <a href="/auth/google"><span className="fa fa-google-plus" /> Google+</a>
            </button>
        </div>
    </>;
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isLoggedIn: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (values, authLogin) => dispatch(actions.auth(values, authLogin)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/blog')),
});

Connect.propTypes = {
  onAuth: PropTypes.func,
  onSetAuthRedirectPath: PropTypes.func,
  onNewUser: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(Connect);
