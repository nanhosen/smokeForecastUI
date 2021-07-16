import React, {  useEffect, useContext, useState } from 'react';
import { SmokeContext } from '../contexts/SmokeContext'
import {Container, Card, CardGroup} from 'react-bootstrap';
import CarouselModal from './CarouselModal.js'
import ImageCard from './ImageCard.js'

function NearSurface() {
  const [ infoText, setInfoText ] = useState()
  const [ updatedTime, setUpdatedTime ] = useState()

  const context = useContext(SmokeContext)
  console.log('context', context)
  useEffect(()=>{
  	setInfoText(context.textInfo)
  },[context.textInfo])
  useEffect(()=>{
  	if(context.updateTime){
    	setUpdatedTime(`Update Time: ${context.updateTime.toString()}`)
  	}
  },[context.updateTime])
  // console.log('sfc infoText', infoText) 
  const levelDays = [1,2,3]
  const levelHours = {
							  	1: 36, 
							  	2: 48
							  }
  const allCards = levelDays.map((curr,i) => {
	const currDay = i+1
		const cardData = {
    	// imageLink: `https://smokeinfo.s3-us-west-1.amazonaws.com/SurfaceDay${currDay}.jpg`,
    	// imageLink: `https://smokeinfo.s3-us-west-1.amazonaws.com/SurfaceDay2.jpg`,
    	// imageLink: `https://smokeinfo.s3-us-west-1.amazonaws.com/thumb.jpg`,
    	imageLink: `https://gacc.nifc.gov/gbcc/predictive/SurfaceDay${currDay}.jpg`,
    	dayText: infoText && infoText[`Surface_text_day${currDay}`] ? infoText[`Surface_text_day${currDay}`]  : 'no text',
    	day: infoText && infoText[`date${currDay}`] ? infoText && infoText[`date${currDay}`] : '',
    	updateTime: updatedTime ? updatedTime : ''
		}
		// console.log('cardData', cardData)
		if(infoText && infoText[`date${currDay}`]){
			return <ImageCard props={ cardData } />
		}
  	// const cardData = { 
	  //   imageLink: `https://gacc.nifc.gov/gbcc/predictive/smokeForecast/testDisplay/day${currDay}Model.png`,
	  //   daySfc:infoText && infoText[`surface_text_day${currDay}`] ? infoText[`surface_text_day${currDay}`]  : 'no text',
	  //   day1000:infoText && infoText[`1000ft_text_day${currDay}`] ? infoText[`1000ft_text_day${currDay}`]  : 'no text',
	  //   day6000:infoText && infoText[`6000ft_text_day${currDay}`] ? infoText[`6000ft_text_day${currDay}`]  : 'no text',
	  //   updateTime: infoText && infoText.updateTime ? infoText.updateTime  : 'no text'
	  // }
   //  console.log('cardData', cardData)
   //  return <ImageCard props={ cardData } />
  })
  return (
  	<Container fluid style={{paddingTop:'10px'}}>
	  	<Card className = "card text-left" >
			  <Card.Header as="h4" style={{backgroundColor:'white'}}>HRRR Near Surface Smoke Forecast - Experimental</Card.Header>
			  <Card.Body>
			    <Card.Text>
		        <small>The HRRR-Smoke model is based on the Weather Research and Forecasting model coupled to Chemistry (WRF-Chem, <a href="http://ruc.noaa.gov/wrf/WG11/">http://ruc.noaa.gov/wrf/WG11/</a>). The dynamics and physics packages and settings for the meteorology of HRRR-Smoke are based on the experimental version of the HRRR model, which is run in real-time (<a href="http://rapidrefresh.noaa.gov/hrrr/">http://rapidrefresh.noaa.gov/hrrr/</a>) at NOAA/ESRL Global Systems Division (GSD). HRRR-Smoke has been developed to simulate the emissions and transport of smoke from wildfires in real time in high spatial resolution. </small>
		      </Card.Text>
			  </Card.Body>
			</Card>
  		<CardGroup className="w-506">
  		  { allCards }
			</CardGroup>
  	</Container>
  );
}

export default NearSurface
				// <CarouselModal />


