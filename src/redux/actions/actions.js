import { ADD_SCORE, LOGIN_USER, ADD_FALSE, ADD_TRUE, RESET_PLAYER } from './actionTypes';

export const loginUser = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const addTrue = (payload) => ({
  type: ADD_TRUE,
  payload,
});

export const addFalse = (payload) => ({
  type: ADD_FALSE,
  payload,
});

export const resetPlayer = () => ({
  type: RESET_PLAYER,
});
