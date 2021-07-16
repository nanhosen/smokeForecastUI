import React, {Suspense} from 'react';
import TabRow from './TabRow.js' 
// import TabRow from './TabRowNoForecast.js' 
import ContentArea from './ContentArea.js' 
// import ContentArea from './ContentAreaNoForecast.js' 
import './tabStyle.css'

function Main() {
  return (
    <>
      <Suspense fallback = {<>Loading...</>} >
        <TabRow />
        <ContentArea  style={{width:'100%',height:'100%'}}  className="h-100"/>
      </Suspense>
     </> 
  );
}

export default Main

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