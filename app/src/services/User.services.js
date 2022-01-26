import axios from 'axios';

export default class UserApi {
  static addUser = (user) => {
    console.log(user);
    return axios
      .post('http://localhost:3090/user', user)
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        return resp.data;
      })
      .catch((err) => console.log(err));
  };
}
