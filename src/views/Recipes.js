import React, { Component } from 'react';
import AppModal from '../components/AppModal';
import RecipeForm from '../components/Forms/RecipeForm';

class Recipes extends Component {
  state = { }

  render() {
    return (
      <>
      <h1>Recipes</h1>
      <AppModal buttonLabel={<i className="fas fa-plus"></i>} title="Add a Recipe" className="recipe-form">
        <RecipeForm />
      </AppModal>
      </>
    );
  }
}

export default Recipes;
