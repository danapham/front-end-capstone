import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyNavbar from '../components/MyNavbar';
import Routes from '../helpers/Routes';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <MyNavbar />
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
