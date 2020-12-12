import axios from 'axios';

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
    // console.log(userId);
    const recipesObj = res.data;
    const userRecipes = [];
    Object.keys(recipesObj).forEach((key) => {
      userRecipes.push(recipesObj[key]);
    });
    resolve(userRecipes);
  }).catch((err) => reject(err));
});

export default { createRecipe, getUserRecipes };
