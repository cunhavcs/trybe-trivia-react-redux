import { ADD_SCORE,
  LOGIN_USER,
  ADD_FALSE,
  ADD_TRUE,
  RESET_PLAYER } from '../actions/actionTypes';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
  notHit: 0,
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case LOGIN_USER:
    return ({ ...state, ...payload });
  case ADD_SCORE:
    return ({ ...state, score: state.score + payload });
  case ADD_TRUE:
    return ({ ...state, assertions: state.assertions + 1 });
  case ADD_FALSE:
    return ({ ...state, notHit: state.notHit + 1 });
  case RESET_PLAYER:
    return (INITIAL_STATE);
  default:
    return state;
  }
};

export default player;
