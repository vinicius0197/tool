import mockData from '../constants/mock';
import {
  GET_BOARD,
  MOVE_CARD,
  MOVE_LIST,
  GET_CARD_OFFSET,
  UPDATE_CARD_OFFSET
} from './types';

export const getBoard = () => {
  const payload = mockData;
  return {
    type: GET_BOARD,
    payload: payload
  };
};

export const moveCard = (updatedList) => {
  return {
    type: MOVE_CARD,
    payload: updatedList
  };
};

export const moveList = (orderedList) => {
  return {
    type: MOVE_LIST,
    payload: orderedList
  };
};

export const getCardOffset = (id, top, left) => {
  return {
    type: GET_CARD_OFFSET,
    payload: { id, top, left }
  };
};

export const updateCardOffset = (id, top, left) => {
  return {
    type: UPDATE_CARD_OFFSET,
    payload: { id, top, left }
  }
};