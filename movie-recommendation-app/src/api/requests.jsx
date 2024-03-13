import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
const URL = 'http://localhost:3001/';

export async function login(body) {
    return axios.post(`${URL}/`, body)
      .then(({ data }) => data)
      .catch((err) => ({ error: err.response.data.message }));
  }

