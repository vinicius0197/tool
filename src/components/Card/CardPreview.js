import React, { memo } from 'react';
import { CardStyle } from './styles';

const styles = {
  display: 'inline-block',
  width: '100%'
};

const CardPreview = memo(() => {
  return(
    <div style={styles}>
      <CardStyle>
        {'this is some text'}
      </CardStyle>
    </div>
  );
});

export default CardPreview;