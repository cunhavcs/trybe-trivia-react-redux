import { ADD_SCORE, LOGIN_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
  score: 0,
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case LOGIN_USER:
    return ({ ...state, ...payload });
  case ADD_SCORE:
    return ({ ...state, score: state.score + payload });
  default:
    return state;
  }
};

export default player;
