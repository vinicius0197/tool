import React from 'react';
import CardList from './CardList';

const Board = () => {
  return(
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <CardList />
      <CardList />
    </div>
  );
};

export default Board;