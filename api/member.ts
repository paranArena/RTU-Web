import axios from 'axios';
import { SERVER_API } from '../config';

const API = axios.create({
  baseURL: SERVER_API,
});
export async function getMyClubs() {
  API.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return API.get('/members/my/clubs')
    .then((res) => res.data.data)
    .catch((e) => e);
}
