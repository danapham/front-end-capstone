import React, { Component } from 'react';
import {
  Row, Col, FormGroup, Label, Input, Button,
} from 'reactstrap';

class IngredientInput extends Component {
  state = {
    ingredientId: '',
    ingredientName: '',
    category: '',
    quantity: '',
    quantityType: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.props.onInputChange(this.state);
  }

  render() {
    return (
      <>
      <Row form>
        <Col md={2}>
      <FormGroup>
        <Label for="quantity">Quantity</Label>
        <Input type="number" name="quantity" onChange={this.handleChange} />
      </FormGroup>
        </Col>
        <Col md={2}>
      <FormGroup>
        <Label for="quantityType">Unit</Label>
        <Input type="select" name="quantityType" onChange={this.handleChange}>
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
        <Input type="text" name="ingredientName" onChange={this.handleChange} />
      </FormGroup>
        </Col>
        <Col md={3}>
      <FormGroup>
        <Label for="category">Ingredient Category</Label>
        <Input type="select" name="category" onChange={this.handleChange}>
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
      </>
    );
  }
}

export default IngredientInput;
