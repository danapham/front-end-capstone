import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Row, Col,
} from 'reactstrap';
import IngredientInput from '../IngredientInput';

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
      {
        ingredientId: '',
        ingredientName: '',
        category: '',
      },
    ],
    recipe_ingredient: {
      quantity: '',
      quantityType: '',
    },
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleAddClick = () => {

  }

  handleIngredientInput = (index, data) => {
    this.setState({
      [this.state.ingredients[index]]: [{ data }],
    });
  }

  render() {
    const { ingredients } = this.state;
    return (
      <>
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <Label for="recipeName">Name</Label>
        <Input type="text" name="recipeName" placeholder="ex. Butternut Squash Soup" onChange={this.handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="text" name="description" onChange={this.handleChange} />
      </FormGroup>
      {ingredients.map((ingredient) => <IngredientInput onInputChange={this.handleIngredientInput} />)}
      <Row>
        <Col md={{ size: 6, offset: 5 }}>
      <Button><i className="fas fa-plus"></i></Button>
          </Col>
      </Row>
      <Button>Submit</Button>
    </Form>
    </>
    );
  }
}

export default RecipeForm;
