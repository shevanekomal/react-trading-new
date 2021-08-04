import './App.css';
import {FieldDataProvider} from './context/FieldData'
import Header from './components/Header'
import React, { useLayoutEffect, useState } from 'react';

const App=()=> {
  return (
    <div className='App'>
      <FieldDataProvider>
      <Header />
    </FieldDataProvider>
    </div>
  );
}

export default App;
