import axios from 'axios';
import getUid from './authData';

const baseUrl = 'https://front-end-capstone-d9988-default-rtdb.firebaseio.com';

const createUserList = () => new Promise((resolve, reject) => {
  const userId = getUid();
  axios.post(`${baseUrl}/lists.json`, { userId }).then((res) => {
    const listId = res.data.name;
    axios.patch(`${baseUrl}/lists/${listId}.json`, { listId });
    resolve(listId);
  }).catch((err) => reject(err));
});

const getUserList = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/lists.json?orderBy="userId"&equalTo"${userId}"`).then((res) => {
    if (res.data === null) {
      createUserList().then((resp) => resolve(resp));
    } else {
      const listArray = Object.values(res.data);
      resolve(listArray[0].listId);
    }
  }).catch((err) => reject(err));
});

export default { getUserList };
