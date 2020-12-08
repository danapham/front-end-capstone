import axios from 'axios';

const baseUrl = 'https://front-end-capstone-d9988-default-rtdb.firebaseio.com';

const createRecipe = (data) => axios.post(`${baseUrl}/recipes.json`, data).then((res) => {
  const firebaseKey = res.data.name;
  axios.patch(`${baseUrl}/recipes/${firebaseKey}.json`, { recipeId: firebaseKey });
}).catch((err) => console.warn(err));

export default { createRecipe };
