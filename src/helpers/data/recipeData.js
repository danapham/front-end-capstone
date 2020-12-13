import axios from 'axios';
import recipeIngredientsData from './recipeIngredientsData';

const baseUrl = 'https://front-end-capstone-d9988-default-rtdb.firebaseio.com';

const createRecipe = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/recipes.json`, data).then((res) => {
    const firebaseKey = res.data.name;
    axios.patch(`${baseUrl}/recipes/${firebaseKey}.json`, { recipeId: firebaseKey });
    resolve(firebaseKey);
  }).catch((err) => reject(err));
});

const getUserRecipes = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipes.json?orderBy="userId"&equalTo="${userId}"`).then((res) => {
    const recipesObj = res.data;
    const userRecipes = [];
    Object.keys(recipesObj).forEach((key) => {
      userRecipes.push(recipesObj[key]);
    });
    resolve(userRecipes);
  }).catch((err) => reject(err));
});

const getSingleRecipe = (recipeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipes.json?orderBy="recipeId"&equalTo="${recipeId}"`).then((res) => {
    const recipeArray = Object.values(res.data);
    resolve(recipeArray[0]);
  }).catch((err) => reject(err));
});

const updateRecipe = (recipeId, data) => axios.patch(`${baseUrl}/recipes/${recipeId}.json`, data);

const deleteRecipe = (recipeId) => axios.get(`${baseUrl}/recipe-ingredients.json?orderBy="recipeId"&equalTo="${recipeId}"`).then((res) => {
  const ingredientKeys = Object.keys(res.data);
  ingredientKeys.forEach((key) => {
    recipeIngredientsData.deleteRecipeIngredient(key);
  });
}).then(() => {
  axios.delete(`${baseUrl}/recipes/${recipeId}.json`);
});

export default {
  createRecipe, getUserRecipes, getSingleRecipe, updateRecipe, deleteRecipe,
};
