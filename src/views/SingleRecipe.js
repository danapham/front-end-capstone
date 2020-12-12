import React, { Component } from 'react';
import recipeData from '../helpers/data/recipeData';

class SingleRecipe extends Component {
  state = {
    recipe: {},
    recipe_ingredients: [],
  }

  componentDidMount() {
    const recipeId = this.props.match.params.id;
    recipeData.getSingleRecipe(recipeId).then((res) => {
      this.setState({
        recipe: res,
      });
    });
  }

  render() {
    const { recipe } = this.state;
    return (
      <div>
      <h1>{recipe.recipeName}</h1>
      <h5>{recipe.description}</h5>
      </div>
    );
  }
}

export default SingleRecipe;
