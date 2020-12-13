import axios from 'axios';

const baseUrl = 'https://front-end-capstone-d9988-default-rtdb.firebaseio.com';

const createListIngredient = (data) => axios.post(`${baseUrl}/list-ingredients.json`, data).then((res) => {
  const firebaseKey = res.data.name;
  axios.patch(`${baseUrl}/list-ingredients/${firebaseKey}.json`, { firebaseKey });
}).catch((err) => console.warn(err));

export default { createListIngredient };
