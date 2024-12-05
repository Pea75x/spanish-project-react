import axios from 'axios';
import { baseUrl } from '../config';

export const loginUser = async (user) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/auth/login/`,
    headers: {
      Accept: 'application/json'
    },
    data: {
      auth: user
    }
  };
  const { data } = await axios.request(options);

  return data;
};

export const createUser = async (user) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/users/`,
    headers: {
      Accept: 'application/json'
    },
    data: {
      user: user
    }
  };
  const { data } = await axios.request(options);

  return data;
};

