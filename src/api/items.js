import axios from 'axios';
import { baseUrl } from '../config';

export const getAllItems = async (model, params) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/${model}/`,
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    },
    params: params
  };
  const { data } = await axios.request(options);
  return data;
};

export const getItemById = async (model, itemId) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/${model}/${itemId}`,
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};

export const createNewItem = async (model, details) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/${model}/`,
    data: { [model]: details },
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};

export const getItemByName = async (model, searchColumn, searchName) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/${model}/?${searchColumn}=${searchName}`,
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};
