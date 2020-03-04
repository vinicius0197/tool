import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBoard, moveCard, moveList } from '../actions';

import CardList from './CardList';

const Board = (props) => {
  useEffect(() => {
    props.getBoard();
  }, []);

  // Receives item data (with parent id) and the id of list to which item is being moved to
  const moveCard = (item, to) => {
    const newCardLists = [...props.lists];
    
    // this line of code removes the item from the original card list
    newCardLists[item.parentPosition].cards = newCardLists[item.parentPosition].cards.filter(el => el.id !== item.cardData.id);
    // this line of code adds the item to new list
    newCardLists[to].cards = [...newCardLists[to].cards, item.cardData];

    props.moveCard(newCardLists);
  };

  const moveList = (itemList, droppedOn) => {
    const newOrderList = [...props.lists];
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

    props.moveList(newOrderList);
  };

  const renderCardLists = () => {
    if(props.lists) {
      return(
        props.lists.map(cardList => {
          return(
            <CardList
              key={cardList.id}
              id={cardList.id}
              position={cardList.position}
              title={cardList.title}
              cards={cardList.cards}
              moveCard={moveCard}
              moveList={moveList}
            />
          );
        })
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return(
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      { renderCardLists() }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    lists: state.board.lists
  };
};

export default connect(mapStateToProps, { getBoard, moveCard, moveList })(Board);