import axios from 'axios';

const baseUrl = 'https://front-end-capstone-d9988-default-rtdb.firebaseio.com';

const createIngredient = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/ingredients.json`, data).then((res) => {
    const firebaseKey = res.data.name;
    axios.patch(`${baseUrl}/ingredients/${firebaseKey}.json`, { ingredientId: firebaseKey });
    resolve(firebaseKey);
  }).catch((err) => reject(err));
});

const getSingleIngredient = (ingredientId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ingredients.json?orderBy="ingredientId"&equalTo="${ingredientId}"`).then((res) => {
    const ingredientObj = Object.values(res.data);
    resolve(ingredientObj[0]);
  }).catch((err) => reject(err));
});

const updateIngredient = (ingredientId, data) => axios.patch(`${baseUrl}/ingredients/${ingredientId}.json`, data);

const deleteIngredient = (ingredientId) => axios.delete(`${baseUrl}/ingredients/${ingredientId}.json`);

export default {
  createIngredient, getSingleIngredient, updateIngredient, deleteIngredient,
};
