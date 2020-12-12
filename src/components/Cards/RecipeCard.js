import React, { Component } from 'react';
import { Card, CardText } from 'reactstrap';

class RecipeCard extends Component {
  state = { }

  render() {
    const { recipe } = this.props;
    return (
      <>
        <Card className="recipe-card">
    <CardText className="recipe-card-text">{recipe.recipeName}</CardText>
        </Card>
      </>
    );
  }
}

export default RecipeCard;
