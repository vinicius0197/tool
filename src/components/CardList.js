import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

import Card from './Card';
import ItemTypes from '../constants/ItemTypes';

const ListWrapper = styled.div`
  width: 272px;
  margin: 0 4px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
`;

const CardListStyle = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  padding: 4px;
`;

const CardList = () => {
  const [cards, setCards] = useState([]);

  const [{ isOver, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => updateCardList(item.cardData),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  const updateCardList = (newItem) => {
    setCards([...cards, newItem]);
    console.log(cards);
  }

  const handleCards = cards => {
    setCards(cards);
  };

  useEffect(() => {
    handleCards([{id: 1, text: 'some text'}, {id: 2, text: 'more text'}]);
  }, []);

  return(
    <ListWrapper>
      <CardListStyle
        ref={drop}
      >
        {cards.map(card => <Card key={card.id} cardData={card} />)}
      </CardListStyle>
    </ListWrapper>
  );
};

export default CardList;