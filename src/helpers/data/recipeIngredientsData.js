import axios from 'axios';

const baseUrl = 'https://front-end-capstone-d9988-default-rtdb.firebaseio.com';

const createRecipeIngredient = (data) => axios.post(`${baseUrl}/recipe-ingredients.json`, data);

export default { createRecipeIngredient };
