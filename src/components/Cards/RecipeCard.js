import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'reactstrap';
import recipeData from '../../helpers/data/recipeData';

class RecipeCard extends Component {
  state = { }

  deleteRecipe = (e) => {
    e.preventDefault();

    recipeData.deleteRecipe(e.target.id);
  }

  render() {
    const { recipe } = this.props;
    return (
      <>
      <Link className="recipe-card-link" to={`/single-recipe/${recipe.recipeId}`}>
        <Card className="recipe-card">
          <CardText className="recipe-card-text">{recipe.recipeName}</CardText>
          <i className="far fa-trash-alt delete-recipe-btn" id={recipe.recipeId} onClick={(e) => this.deleteRecipe(e)}></i>
        </Card>
      </Link>
      </>
    );
  }
}

export default RecipeCard;
