import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

    const createIngredientsPromises = [];
    this.state.ingredients.forEach((ingredient) => {
      createIngredientsPromises.push(listIngredientsData.createListIngredient({
        listId: this.props.listId,
        ingredientId: ingredient.ingredientId,
        checked: false,
      }));
    });

    Promise.all(createIngredientsPromises).then(() => this.props.onUpdate());
  }

  render() {
    const { recipes } = this.state;
    return (
      <>
      <Form className="add-by-recipe-form" onSubmit={(e) => this.handleSubmit(e)}>
        <h2 className="add-by-recipe-h2">Add Items By Recipe:</h2>
        <div className="recipe-list-item-container">
        {recipes.length === 0
          ? <p>You don't have any recipes yet! Get started by <Link to="/recipes" className="add-a-recipe-link">adding a recipe</Link>.</p>
          : recipes.map((recipe) => <FormGroup className="recipe-list-item" check>
          <Label check>
          <Input type="checkbox" id={recipe.recipeId} onChange={(e) => this.handleChange(e)} />
            {recipe.recipeName}
          </Label>
        </FormGroup>)}
        </div>
        <div className="submit-btn-div">
        {recipes.length === 0
          ? <Link to="/recipes"><Button className="add-recipe-link-btn">Add A Recipe</Button></Link>
          : <Button className="add-by-recipe-submit"><i className="fas fa-plus"></i></Button>}
        </div>
      </Form>
      </>
    );
  }
}

export default AddByRecipe;
