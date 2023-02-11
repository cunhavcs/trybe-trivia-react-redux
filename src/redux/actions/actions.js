import { ADD_SCORE, LOGIN_USER } from './actionTypes';

export const loginUser = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});
