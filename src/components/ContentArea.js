import React, {  useContext, useRef, useEffect, useState, Suspense, lazy } from 'react';
import { SmokeContext } from '../contexts/SmokeContext'
import NearSurface from './NearSurface.js'
import UpperLevel from './UpperLevel.js'
import AQMap from './AQMap.js' 
import VisibilityMap from './VisibilityMap.js' 
// import DynamicMap from './DynamicMap.js' 
import ImageCard from './ImageCard.js' 
import LoadingComponent from './LoadingComponent.js' 

import './tabStyle.css'

function ContentArea() {
  const context = useContext(SmokeContext)
  // console.log('context', context)
  const heightRef = useRef()
  const [mapHeight, setMapHeight] = useState(400)
  const [ loaded, setLoaded ] = useState(false)
  const [ loadedAQI, setLoadedAQI ] = useState(false)
  const [ loadedVis, setLoadedVis ] = useState(false)
  const {jumboHeight, tabHeight, windowHeight} = context

  useEffect(() => {
    if(jumboHeight && tabHeight && windowHeight){
      const subtract = tabHeight + jumboHeight 
      const newMapHeight = windowHeight - subtract
      // console.log('newMapHeight', newMapHeight)
      setMapHeight(newMapHeight)
      // console.log('all here', newMapHeight)
    }
  }, windowHeight)
  useEffect(() => {
    const loadState = context.aqiData ? true : false
    setLoadedAQI(loadState)
  },[context.aqiData])

  useEffect(() => {
    const loadState = context.smokeData ? true : false
    setLoadedVis(loadState)
  },[context.smokeData])

  // console.log(window.innerHeight, 'asdf')
  // if(heightRef && heightRef.current){

  // console.log('content area context', context)
  // }
  const infoText = context.textInfo && context.textInfo.day1Text ? context.textInfo.day1Text : 'Loading'
  const updateTime = context.textInfo && context.textInfo.updateTime ? context.textInfo.updateTime : 'Loading'
  const cardData = { 
      modelTitle:'HRRR Near Surface Smoke Forecast - Experimental',
      modelDescription:'The HRRR-Smoke model is based on the Weather Research and Forecasting model coupled to Chemistry (WRF-Chem, http://ruc.noaa.gov/wrf/WG11/). The dynamics and physics packages and settings for the meteorology of HRRR-Smoke are based on the experimental version of the HRRR model, which is run in real-time (http://rapidrefresh.noaa.gov/hrrr/) at NOAA/ESRL Global Systems Division (GSD). HRRR-Smoke has been developed to simulate the emissions and transport of smoke from wildfires in real time in high spatial resolution. Since HRRR-Smoke includes anthropogenic emissions of other particulate matter species, and includes an aerosol aware microphysics scheme, we will also look at aerosol impacts on Numerical Weather Prediction (NWP).',
      // imageLink: ['https://gacc.nifc.gov/gbcc/predictive/smokeForecast/testDisplay/day1Model.png', 'https://gacc.nifc.gov/gbcc/predictive/smokeForecast/testDisplay/day2Model.png', 'https://gacc.nifc.gov/gbcc/predictive/smokeForecast/testDisplay/day3Model.png'],
      imageLink: 'https://smokeinfo.s3.amazonaws.com/grid.png',
      day:1,
      dayText:infoText,
      updateTime
    }
  const componentObj = {
    nrSfc: <NearSurface />,
    // upperLvl: <ImageCard props={ cardData } />,
    upperLvl: <UpperLevel />,
    aqMap: MapArea(loadedAQI, windowHeight, 'aq'),
    visibilityMap: MapArea(loadedVis, windowHeight, 'vis'),
    // visibilityMap: MapArea(loadedVis, windowHeight, 'dynamic'),
    // dynamicMap: MapArea(loadedVis, windowHeight, 'dynamic')
  }
  const displayComponent = componentObj[context.activeContent]
  return (

    <div ref={heightRef} style={{width:'100%',height:'100%'}}  className="h-100">
      <Suspense fallback = {<>Loading</>}>
        {displayComponent}
      </Suspense>
    </div> 
  );
}

export default ContentArea

function MapArea(loadedState, windowHeight, type){
  // if(loadedState == true && type == 'aq'){
  if(type == 'aq'){
    return <div><AQMap  height={windowHeight} className="h-100"/></div>
  }
  // else if(loadedState == true && type == 'vis'){
  else if(type == 'vis'){
    return <div><VisibilityMap  height={windowHeight} className="h-100"/></div>
  }
  else{
    return <LoadingComponent />
    {/*return <div>whatev</div>*/}
  }

}

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