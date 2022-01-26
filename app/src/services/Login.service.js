import axios from 'axios';

export function userService() {
  function login(user) {
    const url = 'http://localhost:3090';
    return axios
      .post(`${url}/login`, {
        userName: user.name,
        passwd: user.passwd,
        typeUser: user.typeUser,
      })
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        return resp.data;
      })
      .catch((err) => console.log(err));
  }

  function logout() {
    localStorage.removeItem(`user`);
  }

  return {
    login,
    logout,
  };
}
