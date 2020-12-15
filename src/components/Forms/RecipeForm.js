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
    recipe: this.props.recipe || {
      recipeId: '',
      recipeName: '',
      description: '',
      userId: '',
    },
    ingredients: this.props.ingredients || [
      {
        firebaseKey: '',
        ingredientId: '',
        ingredientName: '',
        category: '',
        recipeId: '',
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
          firebaseKey: '',
          ingredientId: '',
          ingredientName: '',
          category: '',
          recipeId: '',
          quantity: '',
          quantityType: '',
        },
      ],
    });
  }

  handleDeleteIngredient = (e) => {
    const index = e.target.id;
    const { ingredientId, firebaseKey } = this.state.ingredients[index];
    ingredientsData.deleteIngredient(ingredientId).then(() => recipeIngredientsData.deleteRecipeIngredient(firebaseKey)).then(() => this.props.onUpdate());
    const ingredientsArr = this.state.ingredients;
    ingredientsArr.splice(index, 1);
    this.setState({
      ingredients: ingredientsArr,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.recipe.recipeId === '') {
      const promise1 = recipeData.createRecipe(this.state.recipe)
        .then((res) => {
          const ingredientsArray = this.state.ingredients;
          ingredientsArray.map((ingredient) => ingredient.recipeId = res);
          this.setState({
            ingredients: ingredientsArray,
          });
        });

      const promise2 = this.state.ingredients.forEach((ingredient, i) => {
        ingredientsData.createIngredient({
          ingredientName: ingredient.ingredientName,
          category: ingredient.category,
        }).then((res) => {
          const ingredientsArray = this.state.ingredients;
          ingredientsArray[i].ingredientId = res;
          this.setState({
            ingredients: ingredientsArray,
          });
        });
      });

      Promise.all([promise1, promise2]).then(() => {
        setTimeout(() => {
          this.state.ingredients.forEach((ingredient) => {
            recipeIngredientsData.createRecipeIngredient({
              quantity: ingredient.quantity,
              quantityType: ingredient.quantityType,
              ingredientId: ingredient.ingredientId,
              recipeId: ingredient.recipeId,
            });
          });
        }, 1000);
      })
        .then(() => {
          this.props.onUpdate();
        });
    } else {
      const promise1 = recipeData.updateRecipe(this.state.recipe.recipeId, this.state.recipe);

      const promise2 = new Promise((resolve, reject) => {
        this.state.ingredients.forEach((ingredient) => {
          if (ingredient.firebaseKey === '') {
            ingredientsData.createIngredient({
              ingredientName: ingredient.ingredientName,
              category: ingredient.category,
            }).then((res) => {
              recipeIngredientsData.createRecipeIngredient({
                quantity: ingredient.quantity,
                quantityType: ingredient.quantityType,
                ingredientId: res,
                recipeId: this.state.recipe.recipeId,
              });
              this.props.onUpdate();
            }).then(() => this.props.onUpdate());
          } else {
            ingredientsData.updateIngredient(ingredient.ingredientId, {
              ingredientName: ingredient.ingredientName,
              category: ingredient.category,
            }).then(() => {
              recipeIngredientsData.updateRecipeIngredient(ingredient.firebaseKey, {
                quantity: ingredient.quantity,
                quantityType: ingredient.quantityType,
              });
            });
          }
        });
      });

      Promise.all([promise1, promise2]).then(() => {
        this.props.onUpdate();
      });
    }
  }

  render() {
    const { ingredients } = this.state;

    return (
      <>
      <Form onSubmit={(e) => this.handleSubmit(e)}>
      <h2>Add Recipe</h2>
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
        <Input type="number" min="0" step=".01" value={ingredient.quantity} name="quantity" onChange={(e) => this.handleIngredientChange(e, index)} required />
      </FormGroup>
        </Col>
        <Col md={2}>
      <FormGroup>
        <Label for="quantityType">Unit</Label>
        <Input type="select" name="quantityType" value={ingredient.quantityType} onChange={(e) => this.handleIngredientChange(e, index)} required>
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
        <Input type="text" name="ingredientName" id={ingredient.ingredientId} value={ingredient.ingredientName} onChange={(e) => this.handleIngredientChange(e, index)} required />
      </FormGroup>
        </Col>
        <Col md={3}>
      <FormGroup>
        <Label for="category">Ingredient Category</Label>
        <Input type="select" name="category" value={ingredient.category} id={ingredient.ingredientId} onChange={(e) => this.handleIngredientChange(e, index)} required>
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
        <FormGroup className="recipe-form-delete-container">
      <i id={index} className="fas fa-times recipe-form-delete" onClick={(e) => this.handleDeleteIngredient(e)}></i>
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
