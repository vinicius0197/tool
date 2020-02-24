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
    title: 'mew title',
    cards: [
      {
        id: 3,
        text: 'this is my todo'
      },
    ]
  },
  {
    id: 3,
    title: 'some big cool title',
    cards: [
      {
        id: 4,
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

  // Receives item data (with parent id) and the id of list to which item is being moved to
  const handleStateChange = (item, to) => {
    const newCardLists = [...cardLists];
    
    // this line of code removes the item from the original card list
    newCardLists[item.parent-1].cards = newCardLists[item.parent-1].cards.filter(el => el.id !== item.cardData.id);

    // this line of code adds the item to new list
    newCardLists[to-1].cards = [...newCardLists[to-1].cards, item.cardData];
    setCardLists(newCardLists);
  };

  const renderCardLists = () => {
    return(
      cardLists.map(cardList => {
        return(
          <CardList
            key={cardList.id}
            id={cardList.id}
            title={cardList.title}
            cards={cardList.cards}
            handleStateChange={handleStateChange}
          />
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