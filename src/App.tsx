import React from 'react';
import './styles.css';
import VirtulizedList from './components/VirtualizedList';

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#233142',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        overflow: 'hidden',
      }}
    >
      <VirtulizedList />
    </div>
  );
}

export default App;
