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

const CardList = (props) => {
  const [cards, setCards] = useState([]);

  const [{ isOver, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => updateCardList(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  const updateCardList = (item) => {
    props.handleStateChange(item, props.id);
  }

  const handleCards = cards => {
    setCards(cards);
  };

  useEffect(() => {
    handleCards(props.cards);
  }, [props.cards]);

  return(
    <ListWrapper>
      <CardListStyle
        ref={drop}
      >
        { props.title }
        {cards.map(card => <Card key={card.id} cardData={card} parent={props.id} />)}
      </CardListStyle>
    </ListWrapper>
  );
};

export default CardList;