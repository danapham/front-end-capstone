import axios from 'axios';

const baseUrl = 'https://front-end-capstone-d9988-default-rtdb.firebaseio.com';

const createRecipeIngredient = (data) => {
  data.forEach((rIngredient) => {
    axios.post(`${baseUrl}/recipe-ingredients.json`, rIngredient);
  });
};

export default { createRecipeIngredient };
