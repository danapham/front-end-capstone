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
  }

  handleAddIngredient = () => {
    this.setState({
      ingredients: [...this.state.ingredients,
        {
          ingredientId: '',
          ingredientName: '',
          category: { label: 'Select Category', value: '' },
        }],
      recipe_ingredients: [...this.state.recipe_ingredients,
        {
          recipeId: '',
          ingredientId: '',
          quantity: '',
          quantityType: '',
        }],
    });
  }

  handleDeleteIngredient = (e) => {
    const index = e.target.id;
    const ingredientArr = this.state.ingredients;
    ingredientArr.splice(index, 1);
    this.setState({
      ingredients: ingredientArr,
    });

    const rIArr = this.state.recipe_ingredients;
    rIArr.splice(index, 1);
    this.setState({
      recipe_ingredients: rIArr,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.recipe.recipeId === '') {
      const bigPromise = () => new Promise((resolve, reject) => {
        recipeData.createRecipe(this.state.recipe)
          .then((res) => {
            const rIArray = this.state.recipe_ingredients;
            rIArray.map((rI) => rI.recipeId = res);
            this.setState({
              recipe_ingredients: rIArray,
            });
          });
        const ingredientsArr = this.state.ingredients;
        const rIArr = this.state.recipe_ingredients;
        ingredientsArr.forEach((ingredient, i) => {
          ingredientsData.createIngredient(ingredient).then((res) => {
            rIArr[i].ingredientId = res;
          });
        });
        this.setState({
          recipe_ingredients: rIArr,
        });
        resolve(rIArr).catch((err) => reject(err));
      });

      bigPromise().then((res) => {
        setTimeout(() => {
          recipeIngredientsData.createRecipeIngredient(res);
        }, 1000);
      });
    }
  }

  render() {
    const { ingredients } = this.state;

    return (
      <>
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <Label for="recipeName">Name</Label>
        <Input type="text" value={this.state.recipe.recipeName} name="recipeName" placeholder="ex. Butternut Squash Soup" onChange={(e) => this.handleRecipeChange(e)} required />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="text" value={this.state.recipe.description} name="description" onChange={(e) => this.handleRecipeChange(e)} />
      </FormGroup>
      {ingredients.map((ingredient, index) => <>
          <Row form>
        <Col md={2}>
      <FormGroup>
        <Label for="quantity">Quantity</Label>
        <Input type="number" min="0" step=".01" value={this.state.recipe_ingredients[index].quantity} name="quantity" onChange={(e) => this.handleRIChange(e, index)} required />
      </FormGroup>
        </Col>
        <Col md={2}>
      <FormGroup>
        <Label for="quantityType">Unit</Label>
        <Input type="select" name="quantityType" value={this.state.recipe_ingredients[index].quantityType} onChange={(e) => this.handleRIChange(e, index)} required>
          <option>Choose Unit</option>
          <option>Unit</option>
          <option>Tsp.</option>
          <option>Tbsp.</option>
          <option>Cup</option>
          <option>Lb.</option>
          <option>Oz.</option>
        </Input>
      </FormGroup>
        </Col>
        <Col md={4}>
      <FormGroup>
        <Label for="ingredientName">Ingredient</Label>
        <Input type="text" name="ingredientName" value={this.state.ingredients[index].ingredientName} onChange={(e) => this.handleIngredientChange(e, index)} required />
      </FormGroup>
        </Col>
        <Col md={3}>
      <FormGroup>
        <Label for="category">Ingredient Category</Label>
        <Input type="select" name="category" value={this.state.ingredients[index].category} onChange={(e) => this.handleIngredientChange(e, index)} required>
          <option>Choose Category</option>
          <option>Produce</option>
          <option>Dairy</option>
          <option>Meat</option>
          <option>Seafood</option>
          <option>Pharmacy</option>
          <option>Bakery</option>
          <option>Deli</option>
          <option>Shelf Stable</option>
          <option>Household Goods</option>
          <option>Frozen Foods</option>
        </Input>
      </FormGroup>
        </Col>
      <Col md={1}>
        <FormGroup>
      <Button id={index} onClick={(e) => this.handleDeleteIngredient(e)} ><i id={index} className="fas fa-trash"></i></Button>
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
