/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Row, Col,
} from 'reactstrap';
import getUid from '../../helpers/data/authData';
import recipeData from '../../helpers/data/recipeData';
import ingredientsData from '../../helpers/data/ingredientsData';
import recipeIngredientsData from '../../helpers/data/recipeIngredientsData';

class RecipeForm extends Component {
  state = {
    recipe: {
      recipeId: '',
      recipeName: '',
      description: '',
      userId: '',
    },
    ingredients: [
      {
        ingredientId: '',
        ingredientName: '',
        category: '',
      },
    ],
    recipe_ingredients: [
      {
        recipeId: '',
        ingredientId: '',
        quantity: '',
        quantityType: '',
      },
    ],
  }

  componentDidMount() {
    const userId = getUid();
    this.setState((prevState) => ({
      recipe: {
        ...prevState.recipe,
        userId,
      },
    }));
  }

  handleRecipeChange = (e) => {
    const recipeObj = this.state.recipe;
    recipeObj[e.target.name] = e.target.value;
    this.setState({
      recipe: recipeObj,
    });
  }

  handleRIChange = (e, index) => {
    const rIArr = [...this.state.recipe_ingredients];
    rIArr[index][e.target.name] = e.target.value;
    this.setState({
      recipe_ingredients: rIArr,
    });

    this.state.recipe_ingredients.map((ing) => this.setState({
      [ing.ingredientId]: this.state.recipe.recipeId,
    }));
  }

  handleIngredientChange = (e, index) => {
    const ingredientsArr = [...this.state.ingredients];
    ingredientsArr[index][e.target.name] = e.target.value;
    this.setState({
      ingredients: ingredientsArr,
    });

    this.findIngredientId(this.state.ingredients);
  }

  handleAddIngredient = () => {
    this.setState({
      ingredients: [...this.state.ingredients,
        {
          ingredientId: '',
          ingredientName: '',
          category: '',
        }],
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.recipe.recipeId === '') {
      recipeData.createRecipe(this.state.recipe)
        .then((res) => {
          const rIArray = this.state.recipe_ingredients;
          rIArray.map((rI) => rI.recipeId = res);
          this.setState({
            recipe_ingredients: rIArray,
          });
        });

      this.state.ingredients.forEach((ingredient) => {
        ingredientsData.createIngredient(ingredient).then((res) => {
          const rIArray = this.state.recipe_ingredients;
          rIArray.map((rI) => rI.ingredientId = res);
          this.setState({
            recipe_ingredients: rIArray,
          });
        });
      });

      this.state.recipe_ingredients.forEach((rIngredient) => {
        recipeIngredientsData.createRecipeIngredient(rIngredient);
      });
    }
  }

  findIngredientId = (ingredients) => {
    ingredients.forEach((ingredient, i) => {
      if (this.state.recipe_ingredients[i].ingredientId === '') {
        this.setState({
          [this.state.recipe_ingredients[i].ingredientId]: ingredient.ingredientId,
        });
      }
    });
  }

  render() {
    const { ingredients } = this.state;
    return (
      <>
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <Label for="recipeName">Name</Label>
        <Input type="text" name="recipeName" placeholder="ex. Butternut Squash Soup" onChange={(e) => this.handleRecipeChange(e)} />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="text" name="description" onChange={(e) => this.handleRecipeChange(e)} />
      </FormGroup>
      {ingredients.map((ingredient, index) => <>
          <Row form>
        <Col md={2}>
      <FormGroup>
        <Label for="quantity">Quantity</Label>
        <Input type="number" name="quantity" onChange={(e) => this.handleRIChange(e, index)} />
      </FormGroup>
        </Col>
        <Col md={2}>
      <FormGroup>
        <Label for="quantityType">Unit</Label>
        <Input type="select" name="quantityType" onChange={(e) => this.handleRIChange(e, index)}>
          <option>unit</option>
          <option>tsp.</option>
          <option>tbsp.</option>
          <option>cup</option>
          <option>lb.</option>
          <option>oz.</option>
        </Input>
      </FormGroup>
        </Col>
        <Col md={4}>
      <FormGroup>
        <Label for="ingredientName">Ingredient</Label>
        <Input type="text" name="ingredientName" onChange={(e) => this.handleIngredientChange(e, index)} />
      </FormGroup>
        </Col>
        <Col md={3}>
      <FormGroup>
        <Label for="category">Ingredient Category</Label>
        <Input type="select" name="category" onChange={(e) => this.handleIngredientChange(e, index)}>
          <option>produce</option>
          <option>dairy</option>
          <option>meat</option>
          <option>seafood</option>
          <option>pharmacy</option>
          <option>bakery</option>
          <option>deli</option>
          <option>shelf stable</option>
          <option>household goods</option>
          <option>frozen foods</option>
        </Input>
      </FormGroup>
        </Col>
      <Col md={1}>
        <FormGroup>
      <Button><i className="fas fa-trash"></i></Button>
        </FormGroup>
      </Col>
      </Row>
      {this.state.ingredients.length - 1 === index && <Row>
        <Col md={{ size: 6, offset: 5 }}>
        <Button onClick={this.handleAddIngredient} ><i className="fas fa-plus"></i></Button>
        </Col>
        </Row>}
        </>)}
      <Button>Submit</Button>
    </Form>
    </>
    );
  }
}

export default RecipeForm;
