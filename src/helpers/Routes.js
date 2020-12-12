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
        <PrivateRoute exact path='/recipes' component={Recipes} user={authed} />
        <UserRedirect exact path='/sign-in-page' component={SignInPage} user={authed} />
        <PrivateRoute exact path='/single-recipe' component={SingleRecipe} />
      </Switch>
    );
  }
}

const PrivateRoute = ({ component: SelectedComponent, user, ...rest }) => {
  const routeChecker = (props) => (user
    ? (<SelectedComponent {...props} user={user} />)
    : (<Redirect to={{ pathname: '/sign-in-page', state: { from: props.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const UserRedirect = ({ component: SelectedComponent, user, ...rest }) => {
  const loginChecker = (props) => (!user
    ? (<SelectedComponent {...props} user={user} />)
    : (<Redirect to='/' />));

  return <Route {...rest} render={(props) => loginChecker(props)} />;
};

export default Routes;
