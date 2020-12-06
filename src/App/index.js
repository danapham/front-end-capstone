import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import fbConnection from '../helpers/data/connection';
import MyNavbar from '../components/MyNavbar';
import Routes from '../helpers/Routes';

fbConnection();
class App extends React.Component {
  state = {
    authed: false,
    user: {},
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          user,
        });
      } else {
        this.setState({
          authed: false,
          user: {},
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, user } = this.state;

    return (
      <div className="App">
        <Router>
          {Object.keys(user).length ? <MyNavbar authed={authed} user={user} /> : null}
          <Routes authed={authed} />
        </Router>
      </div>
    );
  }
}

export default App;
