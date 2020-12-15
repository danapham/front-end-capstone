import React, { Component } from 'react';
import getUid from '../helpers/data/authData';
import AppModal from '../components/AppModal';
import recipeData from '../helpers/data/recipeData';
import RecipeForm from '../components/Forms/RecipeForm';
import RecipeCard from '../components/Cards/RecipeCard';

class Recipes extends Component {
  state = {
    recipes: [],
  }

  componentDidMount() {
    this.getRecipes();
  }

  componentDidUpdate() {
    this.getRecipes();
  }

  getRecipes = () => {
    const userId = getUid();
    recipeData.getUserRecipes(userId).then((res) => {
      this.setState({
        recipes: res,
      });
    });
  }

  render() {
    return (
      <>
      <h1 className="recipes-page-h1">Recipes</h1>
      <AppModal buttonLabel={<i className="fas fa-plus"></i>} className="add-recipe-btn" contentClassName="recipe-form" modalClassName="recipe-form-modal">
        <RecipeForm onUpdate={this.getRecipes} />
      </AppModal>
      <div className="recipe-card-container">
      {this.state.recipes.map((recipe) => <RecipeCard key={recipe.recipeId} recipe={recipe} />)}
      </div>
      </>
    );
  }
}

export default Recipes;
