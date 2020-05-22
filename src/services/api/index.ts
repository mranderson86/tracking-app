import axios from 'axios';
import {networkInterfaces} from 'os';

// integração com a api rest
const api = axios.create({
  baseURL: 'https://api-tracking-adonis.herokuapp.com',
});

// requisição de autenticação de usuário
const requestLogin = async (email, password) => {
  //const rs = axios.create({
  //  baseURL: 'https://api-tracking-adonis.herokuapp.com',
  //});

  return await api.post('/sessions', {
    email,
    password,
  });
};

export {api, requestLogin};
