import React, { Component } from 'react';
import { Button } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';

class Auth extends Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <>
      <Button color="secondary" onClick={this.loginClickEvent}><i className="fab fa-google"></i> | Sign in with Google</Button>
      </>
    );
  }
}

export default Auth;
