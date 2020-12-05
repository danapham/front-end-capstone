import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import List from '../views/List';
import NotFound from '../views/NotFound';
import Recipes from '../views/Recipes';
import SignInPage from '../views/SignInPage';
import SingleRecipe from '../views/SingleRecipe';

class Routes extends Component {
  render() {
    const { authed } = this.props;

    return (
      <Switch>
        <PrivateRoute exact path='/' component={List} user={authed} />
        <Route exact path='/not-found' component={NotFound} />
        <Route exact path='/recipes' component={Recipes} />
        <Route exact path='/sign-in-page' component={SignInPage} />
        <Route exact path='/single-recipe' component={SingleRecipe} />
      </Switch>
    );
  }
}

const PrivateRoute = ({ component: selectedComponent, user, ...rest }) => {
  const routeChecker = (props) => (user
    ? (<Component {...props} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

export default Routes;
