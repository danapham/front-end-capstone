import axios from 'axios';

const baseUrl = 'https://front-end-capstone-d9988-default-rtdb.firebaseio.com';

const createListIngredient = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/list-ingredients.json`, data).then((res) => {
    const firebaseKey = res.data.name;
    axios.patch(`${baseUrl}/list-ingredients/${firebaseKey}.json`, { firebaseKey }).then((resp) => {
      if (resp.data.firebaseKey.length > 0) {
        resolve('patch complete');
      }
    }).catch((err) => reject(err));
  }).catch((err) => reject(err));
});

const getListIngredients = (listId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/list-ingredients.json?orderBy="listId"&equalTo="${listId}"`).then((res) => {
    resolve(Object.values(res.data));
  }).catch((err) => reject(err));
});

const deleteListIngredient = (firebaseKey) => axios.delete(`${baseUrl}/list-ingredients/${firebaseKey}.json`);

export default { createListIngredient, getListIngredients, deleteListIngredient };
