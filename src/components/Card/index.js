import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { CardStyle } from './styles';
import ItemTypes from '../../constants/ItemTypes';

const getStyles = (left, top, isDragging) => {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  };
};

const Card = (props) => {
  const[{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.CARD, cardData: props.cardData, parent: props.parent, parentPosition: props.parentPosition },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  });

  return(
    <div>
      <CardStyle
        ref={drag}
      >
        {props.cardData.text}
      </CardStyle>
    </div>
  );
};

export default Card;