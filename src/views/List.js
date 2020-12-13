import React, { Component } from 'react';
import AppModal from '../components/AppModal';
import Auth from '../components/Auth';
import AddByRecipe from '../components/Forms/AddByRecipe';

class List extends Component {
  state = { }

  loadComponent = () => {
    let component = '';

    if (this.props.user) {
      component = <>
        <h1>Shopping List</h1>
        <AppModal buttonLabel='Add By Recipe' title='Choose Recipes'>
          <AddByRecipe />
        </AppModal>
        </>;
    } else {
      component = <Auth />;
    }

    return component;
  };

  render() {
    return (
      <>
      {this.loadComponent()}
      </>
    );
  }
}

export default List;
