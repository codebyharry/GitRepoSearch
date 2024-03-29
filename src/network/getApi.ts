import axios from 'axios';
import {getRepository} from './endpoints';

export const getApi = async (search?: string, page?: number) => {
  const response = await axios.get(
    getRepository + `?q=${search}&per_page=10&page=${page}`,
  );
  return response;
};

export const getContributors = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
