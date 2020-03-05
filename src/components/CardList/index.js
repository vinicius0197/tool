import React, { useCallback } from 'react';
import { useDrop, useDrag } from 'react-dnd';

import Card from '../Card';
import CardDragLayer from '../Card/CardDragLayer';
import ItemTypes from '../../constants/ItemTypes';
import { ListWrapper, CardListStyle } from './styles';

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

const CardList = (props) => {
  const [{ isOver, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      // const delta = monitor.getDifferenceFromInitialOffset();
      // let left = Math.round(item.left + delta.x);
      // let top = Math.round(item.top + delta.y);
      // handleCard(item.id, left, top);
      updateCardList(item);
      return undefined;
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  const [{ isOverList, itemList }, dropList] = useDrop({
    accept: ItemTypes.LIST,
    drop: () => updateListOrder(itemList),
    collect: monitor => ({
      isOverList: !!monitor.isOver(),
      itemList: monitor.getItem(),
    }),
  });

  const[{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.LIST, id: props.id, position: props.position },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const updateCardList = (item) => {
    props.moveCard(item, props.position);
  }

  const updateListOrder = (listItem) => {
    props.moveList(listItem, props.position);
  };

  const renderCards = () => {
    return(
      <CardListWrapper>
        <div ref={dropList}>
          <ListWrapper
            ref={drag}
          >
            <CardListStyle
              ref={drop}
            >
              { props.title }
              {props.cards.map(card =>
                <React.Fragment>
                  <Card key={card.id} cardData={card} parent={props.id} parentPosition={props.position} />
                  <CardDragLayer />
                </React.Fragment>
              )}
            </CardListStyle>
          </ListWrapper>
        </div>
      </CardListWrapper>
    );
  };

  return(
    <React.Fragment>
      { renderCards() }
    </React.Fragment>
  );
};

export default CardList;