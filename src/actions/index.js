import mockData from '../constants/mock';
import {
  GET_BOARD,
  MOVE_CARD,
  MOVE_LIST
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