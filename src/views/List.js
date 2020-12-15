import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, Input,
} from 'reactstrap';
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
    const ingredientsArray = [];
    listIngredients.forEach((ingredient) => {
      const promise1 = recipeIngredientsData.getByIngredient(ingredient.ingredientId);
      const promise2 = ingredientsData.getSingleIngredient(ingredient.ingredientId);

      Promise.all([promise1, promise2]).then((res) => {
        ingredientsArray.push({
          firebaseKey: ingredient.firebaseKey,
          ingredientId: ingredient.ingredientId,
          recipeId: res[0][0].recipeId,
          ingredientName: res[1].ingredientName,
          category: res[1].category,
          quantity: res[0][0].quantity,
          quantityType: res[0][0].quantityType,
          checked: ingredient.checked,
        });

        this.setState({
          ingredients: ingredientsArray,
        });
      });
    });
  };

  deleteListIngredient = (e) => {
    const ingredientsArray = this.state.ingredients;
    ingredientsArray.forEach((ingredient) => {
      listIngredientsData.deleteListIngredient(ingredient.firebaseKey);
    });
    const newArray = ingredientsArray.filter((ingredient) => ingredient.firebaseKey !== e.target.id);
    this.setState({
      ingredients: newArray,
    });
  }

  loadComponent = () => {
    let component = '';

    if (this.props.user) {
      component = <>
      <div className="list-page">
      <div className="list-div">
        <h1 className="list-h1">Shopping List</h1>
        <AppModal buttonLabel='Add By Recipe' className="add-by-recipe-btn">
          <AddByRecipe listId={this.state.listId} listIngredients={this.state.ingredients} onUpdate={this.getListIngredients} />
        </AppModal>
        <div className="list-items-container">
        {this.state.ingredients.map((ingredient) => <ListGroup key={ingredient.firebaseKey}>
          <ListGroupItem key={ingredient.firebaseKey}>
            <Input type="checkbox" key={ingredient.firebaseKey} className="list-checkbox"/>
            <span className="list-item-text">
            {`${ingredient.quantity} ${ingredient.quantityType} ${ingredient.ingredientName} `}
            <i className="far fa-trash-alt" id={ingredient.firebaseKey} onClick={(e) => this.deleteListIngredient(e)}></i>
            </span>
            </ListGroupItem>
        </ListGroup>)}
        </div>
        </div>
        </div>
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
