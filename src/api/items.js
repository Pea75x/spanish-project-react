import axios from 'axios';
import { baseUrl } from '../config';

export const getAllItems = async (model, token, params) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/${model}/`,
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${token}`
    },
    params: params
  };
  const { data } = await axios.request(options);
  return data;
};

export const getItemById = async (model, itemId, token) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/${model}/${itemId}`,
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};

export const createNewItem = async (model, details, token) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/${model}s/`,
    data: { [model]: details },
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};

export const getItemByName = async (model, searchColumn, searchName, token) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/${model}/?${searchColumn}=${searchName}`,
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};
