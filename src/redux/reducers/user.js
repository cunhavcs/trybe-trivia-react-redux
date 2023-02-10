import { LOGIN_USER } from '../actions/actionTypes';

const INITIAL_STATE = {};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case LOGIN_USER:
    return ({ ...state, ...payload });
  default:
    return state;
  }
};

export default user;
