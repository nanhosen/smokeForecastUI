import React from 'react';
import './App.css';
import Jumb from './components/Jumb'
import Main from './components/Main'
import SmokeProvider from './providers/SmokeProvider'

import {Nav} from 'react-bootstrap';

function App() {
  return (
    <div className="h-100 App" style={{width:'100%',height:'100%'}}>
      <SmokeProvider> 
        <Jumb />
        <Main style={{width:'100%',height:'100%'}}  className="h-100"/>
      </SmokeProvider>
    </div>
  );
}

export default App;
      // <Jumb />
      // <Header />