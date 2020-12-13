import React, { Component } from 'react';
import {
  Form, FormGroup, Label, Input,
} from 'reactstrap';
import getUid from '../../helpers/data/authData';
import recipeData from '../../helpers/data/recipeData';

class AddByRecipe extends Component {
  state = {
    recipes: [],
  }

  componentDidMount() {
    const userId = getUid();
    recipeData.getUserRecipes(userId).then((res) => {
      this.setState({
        recipes: res,
      });
    });
  }

  render() {
    return (
      <>
      <Form>
        <FormGroup>
          <Label>Select Recipes</Label>
          <Input type="select">
          </Input>
        </FormGroup>
      </Form>
      </>
    );
  }
}

export default AddByRecipe;
