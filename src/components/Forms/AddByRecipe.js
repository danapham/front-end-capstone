import React, { Component } from 'react';
import {
  Form, FormGroup, Label, Input, Button,
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
    const { recipes } = this.state;
    return (
      <>
      <Form>
        {recipes.map((recipe) => <FormGroup check>
          <Label check>
          <Input type="checkbox" />
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
