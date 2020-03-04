import {
  GET_BOARD,
  MOVE_CARD,
  MOVE_LIST
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case GET_BOARD:
      return {...state, lists: action.payload };
    case MOVE_CARD:
      return {...state, lists: action.payload };
    case MOVE_LIST:
      return {...state, lists: action.payload };
    default:
      return state;
  }
};