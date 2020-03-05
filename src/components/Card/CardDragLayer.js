import React from 'react';
import { useDragLayer } from 'react-dnd';

import CardPreview from './CardPreview';
import ItemTypes from '../../constants/ItemTypes';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

const getItemStyles = (initialOffset, currentOffset) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const CardDragLayer = props => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  function renderCardPreview() {
    switch(itemType) {
      case ItemTypes.CARD:
        // maybe use 'item' here to pass some props to preview
        return <CardPreview />;
      default:
        return null;
    }
  };

  if(!isDragging) {
    return null;
  }

  return(
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        { renderCardPreview() }
      </div>
    </div>
  );
};

export default CardDragLayer;