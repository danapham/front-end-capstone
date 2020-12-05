import React, { Component } from 'react';
import Auth from '../components/Auth';

class List extends Component {
  state = { }

  loadComponent = () => {
    let component = '';

    if (this.props.user) {
      // console.warn('list');
      component = <h1>List</h1>;
    } else {
      component = <Auth />;
    }

    return component;
  };

  render() {
    return (
      <>
      {this.loadComponent}
      </>
    );
  }
}

export default List;
