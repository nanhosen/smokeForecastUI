import React, {  useContext, useRef, useEffect } from 'react';
import { SmokeContext } from '../contexts/SmokeContext'
import { Nav, Dropdown, NavItem, NavLink} from 'react-bootstrap';
import './tabStyle.css'

function TabRow() {
  const context = useContext(SmokeContext)
  const tabHeight = useRef()
  const currentContent = context.activeContent
  const handleSelect = (eventKey) => {
    context.setActiveContent(eventKey)
  };

  useEffect(() => {

    if(tabHeight && tabHeight.current){
      // console.log('tab row tabHeight', tabHeight.current.clientHeight)
      context.setTabHeight(tabHeight.current.clientHeight)
    }
  }, context.windowHeight)
  return (
    <Nav ref={tabHeight} variant="tabs" activeKey={ currentContent } onSelect={handleSelect} style={{backgroundColor:'#283137'}} className="tabStyle">
      {/*<Nav.Item className="tabStyle">
        <Nav.Link  eventKey="nrSfc" >Near Surface</Nav.Link>
      </Nav.Item>
      <Nav.Item className="tabStyle">
        <Nav.Link eventKey="upperLvl">Upper Level</Nav.Link>
      </Nav.Item>*/}
      <Nav.Item className="tabStyle">
        <Nav.Link eventKey="aqMap">Air Quality Map</Nav.Link>
      </Nav.Item>
      <Nav.Item className="tabStyle">
        <Nav.Link eventKey="visibilityMap">Airport Visiblity Map</Nav.Link>
      </Nav.Item>
      <Dropdown as={NavItem} className="tabStyle">
        <Dropdown.Toggle as={NavLink}>Additional Resources</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey= {currentContent } href="https://fire.airnow.gov/?lat=39.036252959636606&lng=-108.45703125000001&zoom=12" target="_blank">AirNow Fire and Smoke Map</Dropdown.Item>
          <Dropdown.Item eventKey= {currentContent } href="https://wildlandfiresmoke.net/outlooks" target="_blank">Smoke Forecast Outlooks</Dropdown.Item>
          <Dropdown.Item eventKey= {currentContent } href="https://rapidrefresh.noaa.gov/hrrr/HRRRsmoke/" target="_blank">Experimental HRRR Smoke Model</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}

export default TabRow

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