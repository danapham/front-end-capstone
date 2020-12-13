import axios from 'axios';

const baseUrl = 'https://front-end-capstone-d9988-default-rtdb.firebaseio.com';

const createRecipeIngredient = (data) => {
  axios.post(`${baseUrl}/recipe-ingredients.json`, data).then((res) => {
    const firebaseKey = res.data.name;
    axios.patch(`${baseUrl}/recipe-ingredients/${firebaseKey}.json`, { firebaseKey });
  }).catch((err) => console.warn(err));
};

const getRecipeIngredients = (recipeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipe-ingredients.json?orderBy="recipeId"&equalTo="${recipeId}"`).then((res) => {
    resolve(Object.values(res.data));
  }).catch((err) => reject(err));
});

const updateRecipeIngredient = (rIngredientId, data) => axios.patch(`${baseUrl}/recipe-ingredients/${rIngredientId}.json`, data);

const deleteRecipeIngredient = (firebaseKey) => axios.delete(`${baseUrl}/recipe-ingredients/${firebaseKey}.json`);

export default {
  createRecipeIngredient, getRecipeIngredients, updateRecipeIngredient, deleteRecipeIngredient,
};
