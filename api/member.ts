import axios from 'axios';
import { SERVER_API } from '../config';

export function getMyInfo() {
  let result = null;
  axios.get(
    `${SERVER_API}/members/my/info`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  ).then((res) => {
    result = res.data.data;
    return result;
  });
}

export function getMyClubs() {
  let result = null;
  axios.get(
    `${SERVER_API}/members/my/clubs`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  ).then((res) => {
    result = res.data.data;
    return result;
  });
}

// user가 가입된 clubs들에 대한 user의 role들 return
export async function getMyClubsRoles() {
  const result = [];
  await axios.get(
    `${SERVER_API}/members/my/clubs`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  ).then((res) => {
    res.data.data.forEach((club) => {
      result.push(club.clubRole);
    });
  });
  return result;
}
