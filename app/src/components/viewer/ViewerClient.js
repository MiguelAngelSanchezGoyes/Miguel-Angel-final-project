import axios from 'axios';

function getaccesstoken() {
  return axios
    .get('/token')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

const Client = { getaccesstoken };
export default Client;
