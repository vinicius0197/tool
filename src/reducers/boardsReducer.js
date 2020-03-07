import {
  GET_BOARD,
  MOVE_CARD,
  MOVE_LIST,
  GET_CARD_OFFSET,
  UPDATE_CARD_OFFSET
} from '../actions/types';

export default (state = { lists: [], positions: [] }, action) => {
  switch(action.type) {
    case GET_BOARD:
      return {...state, lists: action.payload };
    case MOVE_CARD:
      return {...state, lists: action.payload };
    case MOVE_LIST:
      return {...state, lists: action.payload };
    case GET_CARD_OFFSET:
      return {...state, positions: [...state.positions, action.payload ] };
    case UPDATE_CARD_OFFSET:
      return {...state, positions: [...state.positions] };
    default:
      return state;
  }
};