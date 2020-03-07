import React, { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { CardStyle } from './styles';
import ItemTypes from '../../constants/ItemTypes';

const getStyles = (isDragging) => {
  // const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    opacity: isDragging ? 0 : 1,
    // height: isDragging ? 0 : '',
  };
};

const Card = (props) => {
  const cardRef = useRef(null);
  const[{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.CARD, cardData: props.cardData, parent: props.parent, parentPosition: props.parentPosition },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    let { top, left } = cardRef.current.getBoundingClientRect();
    props.getCardPosition(props.cardData.id, top, left);
  }, []);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  });

  return(
    <div ref={cardRef} style={getStyles(isDragging)}>
      <CardStyle
        ref={drag}
      >
        {props.cardData.text}
      </CardStyle>
    </div>
  );
};

export default Card;