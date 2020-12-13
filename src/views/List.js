import React, { Component } from 'react';
import AppModal from '../components/AppModal';
import Auth from '../components/Auth';
import AddByRecipe from '../components/Forms/AddByRecipe';
import getUid from '../helpers/data/authData';
import listData from '../helpers/data/listData';
import listIngredientsData from '../helpers/data/listIngredientsData';
import recipeIngredientsData from '../helpers/data/recipeIngredientsData';
import ingredientsData from '../helpers/data/ingredientsData';

class List extends Component {
  state = {
    listId: '',
    ingredients: [],
  }

  componentDidMount() {
    const userId = getUid();
    listData.getUserList(userId).then((res) => {
      this.setState({
        listId: res,
      });
    }).then(() => {
      this.getListIngredients();
    });
  }

  getListIngredients = async () => {
    const listIngredients = await listIngredientsData.getListIngredients(this.state.listId);
    listIngredients.forEach((ingredient) => {
      const promise1 = recipeIngredientsData.getByIngredient(ingredient.ingredientId);
      const promise2 = ingredientsData.getSingleIngredient(ingredient.ingredientId);

      Promise.all([promise1, promise2]).then((res) => {
        const ingredientsArray = [...this.state.ingredients, {
          ingredientId: ingredient.ingredientId,
          recipeId: res[0][0].recipeId,
          name: res[1].ingredientName,
          category: res[1].category,
          quantity: res[0][0].quantity,
          quantityType: res[0][0].quantityType,
          checked: ingredient.checked,
        }];

        this.setState({
          ingredients: ingredientsArray,
        });
      });
    });
  };

  loadComponent = () => {
    let component = '';

    if (this.props.user) {
      component = <>
        <h1>Shopping List</h1>
        <AppModal buttonLabel='Add By Recipe' title='Choose Recipes'>
          <AddByRecipe listId={this.state.listId} />
        </AppModal>
        </>;
    } else {
      component = <Auth />;
    }

    return component;
  };

  render() {
    return (
      <>
      {this.loadComponent()}
      </>
    );
  }
}

export default List;
