import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'reactstrap';

class RecipeCard extends Component {
  state = { }

  render() {
    const { recipe } = this.props;
    return (
      <>
      <Link className="recipe-card-link" to={`/single-recipe/${recipe.recipeId}`}>
        <Card className="recipe-card">
          <CardText className="recipe-card-text">{recipe.recipeName}</CardText>
        </Card>
      </Link>
      </>
    );
  }
}

export default RecipeCard;
