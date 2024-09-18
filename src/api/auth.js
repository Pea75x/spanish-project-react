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
  window.sessionStorage.setItem('token', data.token);
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
  localStorage.setItem('token', data.token);
  return data;
};

export const logoutUser = localStorage.removeItem('token');

export const isAdmin = () => {
  const token = sessionStorage.getItem('token');
  if (!token) return false;

  const userObject = JSON.parse(window.atob(token.split('.')[1]));
  return !!userObject.admin;
};

export const userId = () => {
  const token = sessionStorage.getItem('token');
  if (!token) return false;

  const userObject = JSON.parse(window.atob(token.split('.')[1]));
  return userObject.user_id;
};
