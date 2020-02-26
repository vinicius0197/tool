import React, { useState, useEffect } from 'react';
import CardList from './CardList';

const mockData = [
  {
    id: 1,
    position: 0,
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
    position: 1,
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
    position: 2,
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
    newCardLists[item.parentPosition].cards = newCardLists[item.parentPosition].cards.filter(el => el.id !== item.cardData.id);
    // this line of code adds the item to new list
    newCardLists[to].cards = [...newCardLists[to].cards, item.cardData];
    setCardLists(newCardLists);
  };

  const handleListOrder = (itemList, droppedOn) => {
    const newOrderList = [...cardLists];
    const prevId = itemList.position;
    const newId = droppedOn;

    const toMove = newOrderList[prevId];

    if(newId > prevId) {
      for(let i = prevId; i < newId; i++) {
        newOrderList[i] = newOrderList[i+1];
        newOrderList[i].position = i;
      }
    } else {
      for(let i = prevId; i > newId; i--) {
        newOrderList[i] = newOrderList[i-1];
        newOrderList[i].position = i;
      }
    }

    newOrderList[newId] = toMove;
    newOrderList[newId].position = newId;

    setCardLists(newOrderList);
  };

  const renderCardLists = () => {
    return(
      cardLists.map(cardList => {
        return(
          <CardList
            key={cardList.id}
            id={cardList.id}
            position={cardList.position}
            title={cardList.title}
            cards={cardList.cards}
            handleStateChange={handleStateChange}
            handleListOrder={handleListOrder}
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