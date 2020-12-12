import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import recipeData from '../helpers/data/recipeData';
import recipeIngredientsData from '../helpers/data/recipeIngredientsData';
import ingredientsData from '../helpers/data/ingredientsData';

class SingleRecipe extends Component {
  state = {
    recipe: {},
    recipeIngredients: [],
    ingredients: [],
  }

  componentDidMount() {
    const recipeId = this.props.match.params.id;
    recipeData.getSingleRecipe(recipeId).then((res) => {
      this.setState({
        recipe: res,
      });
    });
    recipeIngredientsData.getRecipeIngredients(recipeId).then((res) => {
      this.setState({
        recipeIngredients: res,
      });
    }).then(() => {
      this.getIngredients();
    });
  }

  getIngredients = () => {
    this.state.recipeIngredients.forEach((rIngredient) => {
      ingredientsData.getSingleIngredient(rIngredient.ingredientId).then((res) => {
        const ingredients = [...this.state.ingredients, res];
        this.setState({
          ingredients,
        });
      });
    });
  }

  render() {
    const { recipe, recipeIngredients, ingredients } = this.state;
    const renderIngredients = () => {
      const listItems = [];
      if (ingredients.length === recipeIngredients.length) {
        recipeIngredients.forEach((rIngredient) => {
          const correctIngredient = ingredients.filter((ingredient) => ingredient.ingredientId === rIngredient.ingredientId);
          listItems.push(<ListGroupItem>{`${rIngredient.quantity} ${rIngredient.quantityType} ${correctIngredient[0].ingredientName}`}</ListGroupItem>);
        });
      }
      return listItems;
    };
    return (
      <div>
      <h1>{recipe.recipeName}</h1>
      <h5>{recipe.description}</h5>
      <ListGroup>
        {renderIngredients()}
      </ListGroup>
      </div>
    );
  }
}

export default SingleRecipe;
