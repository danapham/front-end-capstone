import React, { Component } from 'react';
import Auth from '../components/Auth';
import logo from '../components/MyNavbar/gredients-logo.png';

class SignInPage extends Component {
  state = { }

  render() {
    return (
      <>
      <div className="sign-in-container">
      <div className="sign-in-outer">
      <div className="sign-in-div">
      <img src={logo} alt="gredients logo" />
      <h1 className="sign-in-h1">Welcome to gredients</h1>
      <Auth />
      </div>
      </div>
      </div>
      </>
    );
  }
}

export default SignInPage;
