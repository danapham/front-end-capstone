import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import List from '../views/List';
import NotFound from '../views/NotFound';
import Recipes from '../views/Recipes';
import SignInPage from '../views/SignInPage';
import SingleRecipe from '../views/SingleRecipe';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={List} />
        <Route exact path='/not-found' component={NotFound} />
        <Route exact path='/recipes' component={Recipes} />
        <Route exact path='/sign-in-page' component={SignInPage} />
        <Route exact path='/single-recipe' component={SingleRecipe} />
      </Switch>
    );
  }
}

export default Routes;
