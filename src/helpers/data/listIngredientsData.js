import axios from 'axios';

const baseUrl = 'https://front-end-capstone-d9988-default-rtdb.firebaseio.com';

const createListIngredient = (data) => axios.post(`${baseUrl}/list-ingredients.json`, data).then((res) => {
  const firebaseKey = res.data.name;
  axios.patch(`${baseUrl}/list-ingredients/${firebaseKey}.json`, { firebaseKey });
}).catch((err) => console.warn(err));

const getListIngredients = (listId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/list-ingredients.json?orderBy="listId"&equalTo="${listId}"`).then((res) => {
    resolve(Object.values(res.data));
  }).catch((err) => reject(err));
});

export default { createListIngredient, getListIngredients };
