import React, {  useEffect, useContext, useState } from 'react';
import { SmokeContext } from '../contexts/SmokeContext'
import {Container, Card, CardGroup} from 'react-bootstrap';
import CarouselModal from './CarouselModal.js'

function ModelInfoCard(props) {
	const { modelTitle, modelDescription } = props.props
  const context = useContext(SmokeContext)
  console.log('sfc infoText', infoText)
  return (
  	
  	<Card className = "card text-left" >
		  <Card.Header as="h4" style={{backgroundColor:'white'}}>HRRR Near Surface Smoke Forecast - Experimental</Card.Header>
		  <Card.Body>
		    <Card.Text>
	        <small>The HRRR-Smoke model is based on the Weather Research and Forecasting model coupled to Chemistry (WRF-Chem, http://ruc.noaa.gov/wrf/WG11/). The dynamics and physics packages and settings for the meteorology of HRRR-Smoke are based on the experimental version of the HRRR model, which is run in real-time (http://rapidrefresh.noaa.gov/hrrr/) at NOAA/ESRL Global Systems Division (GSD). HRRR-Smoke has been developed to simulate the emissions and transport of smoke from wildfires in real time in high spatial resolution. Since HRRR-Smoke includes anthropogenic emissions of other particulate matter species, and includes an aerosol aware microphysics scheme, we will also look at aerosol impacts on Numerical Weather Prediction (NWP).</small>
	      </Card.Text>
		  </Card.Body>
		</Card>
  		
  );
}

export default ModelInfoCard


