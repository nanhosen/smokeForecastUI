import React, {Suspense, lazy} from 'react';
import './App.css';
// import Main from './components/Main'

import {Nav} from 'react-bootstrap';
// import SmokeProvider from './providers/SmokeProvider'
// import Jumb from './components/Jumb'
const SmokeProvider = React.lazy(() => import('./providers/SmokeProvider'))
const Jumb = React.lazy(() => import('./components/Jumb'))
const Main = React.lazy(() => import('./components/Main'))

function App() {
  return (
    <div className="h-100 App" style={{width:'100%',height:'100%'}}>
        <Suspense fallback={<div>Loading...</div>}>
      <SmokeProvider> 
        <Jumb />
          <Main style={{width:'100%',height:'100%'}}  className="h-100"/>
      </SmokeProvider>
        </Suspense>  
    </div>
  );
}

export default App;
      // <Jumb />
      // <Header />