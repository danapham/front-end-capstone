import React, { Component } from 'react';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import getUid from '../../helpers/data/authData';
import recipeData from '../../helpers/data/recipeData';
import recipeIngredientsData from '../../helpers/data/recipeIngredientsData';
import listIngredientsData from '../../helpers/data/listIngredientsData';

class AddByRecipe extends Component {
  state = {
    recipes: [],
    ingredients: [],
  }

  componentDidMount() {
    const userId = getUid();
    recipeData.getUserRecipes(userId).then((res) => {
      this.setState({
        recipes: res,
      });
    });
  }

  handleChange = (e) => {
    if (e.target.checked) {
      recipeIngredientsData.getRecipeIngredients(e.target.id).then((res) => {
        const ingredientsArray = [...this.state.ingredients, ...res];
        this.setState({
          ingredients: ingredientsArray,
        });
      });
    } else {
      const ingredientsArray = this.state.ingredients;
      const newArray = ingredientsArray.filter((ingredient) => ingredient.recipeId !== e.target.id);
      this.setState({
        ingredients: newArray,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.state.ingredients.forEach((ingredient) => {
      listIngredientsData.createListIngredient({
        listId: this.props.listId,
        ingredientId: ingredient.ingredientId,
        checked: false,
      });
    });
  }

  render() {
    const { recipes } = this.state;
    return (
      <>
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        {recipes.map((recipe) => <FormGroup check>
          <Label check>
          <Input type="checkbox" id={recipe.recipeId} onChange={(e) => this.handleChange(e)} />
            {recipe.recipeName}
          </Label>
        </FormGroup>)}
        <Button>Submit</Button>
      </Form>
      </>
    );
  }
}

export default AddByRecipe;
