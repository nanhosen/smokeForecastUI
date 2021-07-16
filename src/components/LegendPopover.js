import React, { useEffect, useState, useRef, useContext} from 'react';
import {OverlayTrigger, Tooltip, Button, Popover, Image} from 'react-bootstrap';
import { SmokeContext } from '../contexts/SmokeContext'

import './legendStyle.css'
import legendImage from './legendImg.png'
import visLegend from './visLegend.PNG'


export default function LegendPopover(){
	const [mapType, setMapType] = useState('loading')
	const context = useContext(SmokeContext)
	console.log('legend context', context)
	useEffect(() => {
		// console.log('context.activeContent', context.activeContent)
		if(context.activeContent === 'visibilityMap' || context.activeContent === 'aqMap'){
			setMapType(context.activeContent)
		}
	}, [context.activeContent])
	console.log('legend mapType', mapType)
	return(<Popover id="popover-basic">
    <Popover.Title as="h3">Airport Flight Category Legend</Popover.Title>
    <Popover.Content>
      <Image src={visLegend} fluid />
    </Popover.Content>
  </Popover>);
} 

// const popoverAQ = 
//   (<Popover id="popover-basic">
//     <Popover.Title as="h3">Air Quality Legend</Popover.Title>
//     <Popover.Content>
//       <Image src={legendImage} fluid />
//     </Popover.Content>
//   </Popover>
// );

// const popoverVis = 
//   (<Popover id="popover-basic">
//     <Popover.Title as="h3">Airport Flight Category Legend</Popover.Title>
//     <Popover.Content>
//       <Image src={visLegend} fluid />
//     </Popover.Content>
//   </Popover>
// );  

// const popoverLoading = 
//   (<Popover id="popover-basic">
//     <Popover.Title as="h3">Loading...</Popover.Title>
//     <Popover.Content>
//       Loading...
//     </Popover.Content>
//   </Popover>
// );    

// const Example = (props) => {
// 	const { mapType } = props
// 	const overlayObj = {
// 		visibilityMap: popoverVis,
// 		aqMap: popoverAQ
// 	}
// 	var overlayType = popoverLoading
// 	// const overlayType = overlayObj['visibility']
// 	if(mapType === 'visibility'){
// 		 overlayType = popoverVis
// 	}
// 	if(mapType === 'airQuality'){
// 		 overlayType = popoverAQ
// 	}
// 	console.log('exampe props', typeof mapType, 'overlayType', overlayType, popoverVis, popoverAQ, overlayObj[mapType])
// 	return (
// 	  <OverlayTrigger trigger="click" placement="left" overlay={overlayType}>
// 	    <Button variant="dark">{'\u00AB'}</Button>
// 	  </OverlayTrigger>
// 	)
// };



// <div className='legend-title'>3-day ERC Trend:</div>
// 			<div className='legend-scale'>
// 			  <ul className='legend-labels'>
// 			    <li><span className='dot' style={{backgroundColor:'#00cc00'}}></span>increase of 3 or greater</li>
// 			    <li><span className='dot' style={{backgroundColor:'#ff0'}}></span>decrease of 3 or greater</li>
// 			    <li><span className='dot' style={{backgroundColor:'#ffa700'}}></span>change of less than 3</li>
// 			  </ul>
// 			</div>    
// 			<div className='legend-bottom'>Obs Date: {date.obDate}</div>
// 			<div className='legend-source'>Source: <a href="#link to source">WIMS </a></div>




// export default function Legend(){
// 	// console.log('legend',dataState)
// 	return(
// 		 <OverlayTrigger
// 	    placement="left"
// 	    overlay={
// 	    	<Popover id={`popover-positioned-Left`}>
//           <Popover.Title as="h3">{`Popover Left`}</Popover.Title>
//           <Popover.Content>
//             <strong>Holy guacamole!</strong> Check this info.
//           </Popover.Content>
//         </Popover>
// 	    }
// 	  >
// 	    {({ ref, ...triggerHandler }) => (
// 	      <Button
// 	        variant="light"
// 	        {...triggerHandler}
// 	        className="d-inline-flex align-items-center"
// 	      >
// 	        <span className="ml-1"><b>{'\u00AB'}</b></span>
// 	      </Button>
// 	    )}
// 	  </OverlayTrigger>
		
// 	)
// }