import React, { Component } from 'react';
import AppModal from '../components/AppModal';
import Auth from '../components/Auth';
import AddByRecipe from '../components/Forms/AddByRecipe';
import getUid from '../helpers/data/authData';
import listData from '../helpers/data/listData';

class List extends Component {
  state = {
    listId: '',
  }

  componentDidMount() {
    const userId = getUid();
    listData.getUserList(userId).then((res) => {
      this.setState({
        listId: res,
      });
    });
  }

  loadComponent = () => {
    let component = '';

    if (this.props.user) {
      component = <>
        <h1>Shopping List</h1>
        <AppModal buttonLabel='Add By Recipe' title='Choose Recipes'>
          <AddByRecipe listId={this.state.listId} />
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
