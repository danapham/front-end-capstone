import React from 'react';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

const RecipeForm = (props) => (
    <Form>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" placeholder="ex. Butternut Squash Soup" />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="text" name="description" />
      </FormGroup>
      <FormGroup>
        <Label for="quantity">Quantity</Label>
        <Input type="number" name="quantity" />
      </FormGroup>
      <FormGroup>
        <Label for="unit">Unit</Label>
        <Input type="select" name="unit">
          <option>unit</option>
          <option>tsp.</option>
          <option>tbsp.</option>
          <option>cup</option>
          <option>lb.</option>
          <option>oz.</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="ingredient">Ingredient</Label>
        <Input type="text" name="ingredient" />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
);

export default RecipeForm;
