import React from 'react';
import { useDrop, useDrag } from 'react-dnd';

import Card from '../Card';
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
    drop: () => updateCardList(item),
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
              {props.cards.map(card => <Card key={card.id} cardData={card} parent={props.id} parentPosition={props.position} />)}
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