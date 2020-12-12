import axios from 'axios';

const baseUrl = 'https://front-end-capstone-d9988-default-rtdb.firebaseio.com';

const createRecipeIngredient = (data) => {
  data.forEach((rIngredient) => {
    axios.post(`${baseUrl}/recipe-ingredients.json`, rIngredient);
  });
};

const getRecipeIngredients = (recipeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipe-ingredients.json?orderBy="recipeId"&equalTo="${recipeId}"`).then((res) => {
    resolve(Object.values(res.data));
  }).catch((err) => reject(err));
});

export default { createRecipeIngredient, getRecipeIngredients };
