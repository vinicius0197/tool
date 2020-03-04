import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import Board from './Board/';

const App = () => {
  return(
    <React.Fragment>
      <div>Tool Project</div>
      <DndProvider backend={Backend}>
        <Board />
      </DndProvider>
    </React.Fragment>
  );
};

export default App;