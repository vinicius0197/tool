import React from 'react';
import { useDrag } from 'react-dnd';

import { CardStyle } from './styles';
import ItemTypes from '../../constants/ItemTypes';

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