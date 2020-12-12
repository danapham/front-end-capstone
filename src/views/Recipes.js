import React, { Component } from 'react';
import AppModal from '../components/AppModal';
import getUid from '../helpers/data/authData';
import recipeData from '../helpers/data/recipeData';
import RecipeForm from '../components/Forms/RecipeForm';

class Recipes extends Component {
  state = {
    recipes: [],
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes = () => {
    const userId = getUid();
    // console.log(userId);
    recipeData.getUserRecipes(userId).then((res) => {
      // console.log(res);
      this.setState({
        recipes: res,
      });
    });
  }

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
