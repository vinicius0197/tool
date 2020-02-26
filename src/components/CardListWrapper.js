import React from 'react';
import { useDrop } from 'react-dnd';

import ItemTypes from '../constants/ItemTypes';

const CardListWrapper = (props) => {
  const [{ isOver, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  return(
    <div
      ref={drop}
    >
      { props.children }
    </div>
  );
};

export default CardListWrapper;