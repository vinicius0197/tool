import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';

const CardStyle = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 85px;
  position: relative;
`;

const Card = (props) => {
  const[{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, cardData: props.cardData, parent: props.parent, parentPosition: props.parentPosition },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return(
    <CardStyle
      ref={drag}
    >
      {props.cardData.text}
    </CardStyle>
  );
};

export default Card;