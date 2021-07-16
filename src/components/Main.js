import React, {Suspense, lazy} from 'react';
// import TabRow from './TabRow.js' 
import './tabStyle.css'
import LoadingComponent from './LoadingComponent.js' 
// import TabRow from './TabRowNoForecast.js' 
// import ContentArea from './ContentArea.js' 
const ContentArea = React.lazy(() => import('./ContentArea'))
const TabRow = React.lazy(() => import('./TabRow'))
// import ContentArea from './ContentAreaNoForecast.js' 

function Main() {
  return (
    <>
      <TabRow />
      <Suspense fallback = {<LoadingComponent />} >
        <ContentArea  style={{width:'100%',height:'100%'}}  className="h-100"/>
      </Suspense>
     </> 
  );
}

export default Main

// import React, {Suspense, lazy} from 'react';
// import './App.css';
// // import Main from './components/Main'

// import {Nav} from 'react-bootstrap';
// // import SmokeProvider from './providers/SmokeProvider'
// // import Jumb from './components/Jumb'
// const SmokeProvider = React.lazy(() => import('./providers/SmokeProvider'))
// const Jumb = React.lazy(() => import('./components/Jumb'))
// const Main = React.lazy(() => import('./components/Main'))

// function App() {
//   return (
//     <div className="h-100 App" style={{width:'100%',height:'100%'}}>
//       <Suspense fallback={<div>Loading...</div>}>
//         <SmokeProvider> 
//           <Jumb />
//           <Main style={{width:'100%',height:'100%'}}  className="h-100"/>
//         </SmokeProvider>
//       </Suspense>  
//     </div>
//   );
// }

// export default App;
      // <Jumb />
      // <Header />

// function Main() {
//   const [key, setKey] = useState('home');
//   const context = useContext(SmokeContext)
//   return (
//     <Tabs
//       id="controlled-tab-example"
//       activeKey={key}
//       onSelect={(k) => setKey(k)}
//       style={{backgroundColor:'#515152'}}
//       className="tabStyle"
//     >
//       <Tab variant="tabStyle" eventKey="home" title="Near Surface Smoke Forecast">
//         <NearSurface />
//       </Tab>
//       <Tab eventKey="profile" title="Visiblity Forecast">
//         <NearSurface />
//       </Tab>
//       <Tab eventKey="contact" title="Current Air Quality Conditions">
//           <AQMap />
//       </Tab>
//       <Tab eventKey="additionalInfo" title="Additional Resources">
//           <AdditionalResources />
//       </Tab>
//     </Tabs>
//   );
// }

// export default Main

    // {`
    // .linkWhite {
    //   background-color: purple;
    //   color: white;
    // }

    // .btn-xxl {
    //   padding: 1rem 1.5rem;
    //   font-size: 1.5rem;
    // }
    // `}

  //     <style type="text/css">
  //   {`
  //   	.myTab a { color: white }
  //   `}
  // </style>