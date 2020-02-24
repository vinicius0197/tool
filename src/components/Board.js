import React, { useState, useEffect } from 'react';
import CardList from './CardList';

const mockData = [
  {
    id: 1,
    title: 'some title',
    cards: [
      {
        id: 1,
        text: 'this is my todo'
      },
      {
        id: 2,
        text: 'this is some other todo'
      },
    ]
  },
  {
    id: 2,
    title: 'some mew title',
    cards: [
      {
        id: 3,
        text: 'this is my todo'
      },
    ]
  }
];

const Board = () => {
  const [cardLists, setCardLists] = useState([]);

  const handleCardLists = (cardLists) => {
    setCardLists(cardLists);
  };

  useEffect(() => {
    handleCardLists(mockData);
  }, []);

  const renderCardLists = () => {
    return(
      cardLists.map(cardList => {
        return(
          <CardList key={cardList.id} title={cardList.title} cards={cardList.cards} />
        );
      })
    );
  };

  return(
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      { renderCardLists() }
    </div>
  );
};

export default Board;