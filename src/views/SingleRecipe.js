import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import recipeData from '../helpers/data/recipeData';
import recipeIngredientsData from '../helpers/data/recipeIngredientsData';
import ingredientsData from '../helpers/data/ingredientsData';
import AppModal from '../components/AppModal';
import RecipeForm from '../components/Forms/RecipeForm';

class SingleRecipe extends Component {
  state = {
    recipe: {},
    recipeIngredients: [],
    ingredients: [],
  }

  componentDidMount() {
    this.getRecipeData();
  }

  getRecipeData = () => {
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
      const ingredientsArr = [];
      this.state.recipeIngredients.forEach((rIngredient) => {
        ingredientsData.getSingleIngredient(rIngredient.ingredientId).then((res) => {
          const ingredient = { ...rIngredient, ...res };
          ingredientsArr.push(ingredient);
        }).then(() => this.setState({
          ingredients: ingredientsArr,
        }));
      });
    });
  }

  render() {
    const { recipe, ingredients } = this.state;
    return (
      <div className="single-recipe-container">
      <div className="single-recipe-div">
      <h1>{recipe.recipeName}</h1>
      <h5>{recipe.description}</h5>
      <div className="single-recipe-list-container">
      <ListGroup>
        {ingredients.map((ingredient) => (<ListGroupItem className="single-recipe-list-item">{`${ingredient.quantity} ${ingredient.quantityType} ${ingredient.ingredientName}`}</ListGroupItem>))}
      </ListGroup>
      </div>
      <AppModal buttonLabel="Edit" className="edit-recipe-btn" contentClassName="recipe-form" modalClassName="recipe-form-modal">
        <RecipeForm recipe={this.state.recipe} ingredients={this.state.ingredients} onUpdate={this.getRecipeData} />
      </AppModal>
      </div>
      </div>
    );
  }
}

export default SingleRecipe;
