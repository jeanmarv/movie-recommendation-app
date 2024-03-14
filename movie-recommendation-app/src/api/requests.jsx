import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
const URL = 'http://localhost:3001';

const login = async (userData) => {
  try {
      const response = await axios.post(`${URL}/`, userData);
      return response;
  } catch (error) {
      console.error('Erro ao fazer requisição de login:', error);
      throw error; // Lança o erro para que ele possa ser tratado no componente que faz a chamada
  }
};

const register = async (userData) => {
  try {
    console.log(userData);
      const response = await axios.post(`${URL}/register`, userData);
      return response;
  } catch (error) {
      console.error('Erro ao fazer requisição de registro:', userData);
      console.log(userData)
      throw error; // Lança o erro para que ele possa ser tratado no componente que faz a chamada
  }
}

// const getMoviesID = async (userData) => {
//   try {
//     const response = await axios.get(`${URL}/`, userData);
//     return response;
//   } catch (error) {
//     console.error('Erro ao fazer requisição de movies:', error);
//     throw error; // Lança o erro para que ele possa ser tratado no componente que faz a chamada
//   }
// }

export { login, register };