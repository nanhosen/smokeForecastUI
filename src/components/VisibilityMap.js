import React, { useRef, useEffect, useContext, useState } from 'react';
import { SmokeContext } from '../contexts/SmokeContext'
import {Container, Spinner, Navbar} from 'react-bootstrap';

import Legend from './Legend'
import MapInfoCard from './MapInfoCard'

import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
import VectorSource from 'ol/source/Vector.js'
import GeoJSON from 'ol/format/GeoJSON';
import XYZ from 'ol/source/XYZ'
import 'ol/ol.css'
import './tabStyle.css'
import './popupStyle.css'
import {Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style.js' 
import {toStringHDMS} from 'ol/coordinate'
import {toLonLat} from 'ol/proj';
import Overlay from "ol/Overlay.js"; 

import centerBoundaries from '../data/National_GACC_Boundaries_JSON.json'
import airData from '../data/airData.json'
import latest_smoke from '../data/latest_smoke.json'
import iconImage from './smokeIcon.png'
import airportLocations from '../data/airports.geojson'
import PopupInside from './PopupInside'

console.log(iconImage, 'iconImage')

var mapboxLayer = new TileLayer({
  source: new XYZ({
    url: 'https://api.mapbox.com/styles/v1/nanhosen/ckcxziwe017vi1imsnzt1aucp/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'
    // url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'
  })
})

var boundarySource = new VectorSource({
  features: (new GeoJSON()).readFeatures(centerBoundaries, {
    dataProjection : 'EPSG:4326', 
    featureProjection: 'EPSG:3857'
  })  
});

var boundaryLayer = new VectorLayer({
  source: boundarySource,
  style:  new Style({
    stroke: new Stroke({
      color: 'black',
      width: 1
    })
  })
});

var olMap = new Map({
		  layers: [
		      mapboxLayer,
		      boundaryLayer
		    ],
		  target: null,
		  view: new View({
		    center: [-12704445.597223, 5053404.813990], //coordinates in EPSG3857 (x, y). Get new ones here: https://epsg.io/map#srs=3857&x=-12578783.122722&y=4902242.944054&z=10&layer=streets
		    zoom: 6,
		    projection:'EPSG:3857'
		  })
		})
const returnColor = (feature) =>{
	const aqiVal = feature.values_.AQI
	// console.log('aqiVal', aqiVal)
	if(aqiVal){
		var color
		if(aqiVal === 0 || aqiVal === "0"){
			color =  '#00cc00' 
		}
		if(aqiVal<=50){
			color =  '#00e400' //green
		}
		else if(aqiVal>50 && aqiVal<=100){
			color =  '#ffff00' //yellow
		}
		else if(aqiVal>=101 && aqiVal<151){
			color =  '#ff7e00' //orange
		}
		else if(aqiVal>=151 && aqiVal<201){
			color =  '#ff0000' //red
		}
		else if(aqiVal>= 201  && aqiVal<301){
			color =  '#8f3f97' //purple
		}
		else if(aqiVal>=301){
			color =  '#7e0023' //maroon
		}
		return color
	}
	else{
		// console.log('no percentile', percentile)
		return '#21252900'
	}
}

const styleFunction = (feature) =>{
	const categoryColor = returnColor(feature)
	var retStyle = new Style({
	  image: new CircleStyle({
	    radius: 5,
	    fill: new Fill({
	      color: categoryColor
	    }),
	    stroke: new Stroke({
	      color: 'black',
	      width: 0.5
	    })
	  }),
	})
	return retStyle
}

function getMetarColor(category){
	const colorObj = {
		LIFR: '#8f3f97',
		IFR: '#ff7e00',
		MVFR: '#ffff00',
		VFR: '#00cc00'
	}
	const returnColor = colorObj[category] ? colorObj[category] : 'white'
	// console.log('returnColor', returnColor, 'category', category)
	return returnColor
}

var createTextStyle = function(feature, resolution) {
	const textColor = getMetarColor(feature.get('fltcat'))
  return new Text({
    textAlign: 'end',
    text: resolution < 200000 ? feature.get('id') : '',
    fill: new Fill({color: textColor}),
    stroke: new Stroke({color: 'black', width: 1}),
    offsetX: 0,
    scale: 1.5
  });
};

function pointStyleFunction(feature, resolution) {
	// console.log('feature', feature)
	var returnStyle  = new Style({
        image: new CircleStyle({
            radius: 0,
            fill: new Fill({
              color: 'white'
            }),
            stroke: new Stroke({
              color: 'black'
            })
          })
      })
	if(feature.get('fltcat')){
		returnStyle = new Style({
        image: new CircleStyle({
            radius: 1,
            fill: new Fill({
              color: 'white'
            }),
            stroke: new Stroke({
              color: 'black'
            })
          }),
        text: createTextStyle(feature,resolution)
      })
	}
  return returnStyle
}



function VisibilityMap(props) {
	const popupContentRef = useRef()
	const popupCloserRef = useRef()
	const popupRef = useRef()
  const context = useContext(SmokeContext)
  const [ popupContent, setPopupContent ] = useState({})
  // console.log('props', props.height)

// 		QI Color	Levels of Concern	Values of Index	Description of Air Quality
// Green	Good	0 to 50	Air quality is satisfactory, and air pollution poses little or no risk.
// Yellow	Moderate	51 to 100	Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.
// Orange	Unhealthy for Sensitive Groups	101 to 150	Members of sensitive groups may experience health effects. The general public is less likely to be affected.
// Red	Unhealthy	151 to 200	Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.
// Purple	Very Unhealthy	201 to 300	Health alert: The risk of health effects is increased for everyone.
// Maroon	Hazardous	301 and higher	Health warning of emergency conditions: everyone is more likely to be affected.

  const mapContainer = useRef(null)
  
	//http://www.airnowapi.org/aq/data/?startDate=2020-08-29T21&endDate=2020-08-29T22&parameters=OZONE,PM25,PM10,CO,NO2,SO2&BBOX=-137.216187,-0.233809,-54.598999,63.756839&dataType=B&format=application/json&verbose=0&nowcastonly=0&includerawconcentrations=0&API_KEY=6CEBF74A-FEAB-49BF-82B1-7BCDAB41EE35
	function makeVisibilityLayer(data){
		// if(!data){
		// 	// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
		// }
		// else(
		// 	console.log('nowImhere') 
		// )
		// console.log('data', data)
		var visDataSource = new VectorSource({
		  features: (new GeoJSON()).readFeatures(data, {
		    dataProjection : 'EPSG:4326', 
		    featureProjection: 'EPSG:3857'
		  })  
		});
		const visDataLayer = new VectorLayer({
			  source: visDataSource, 
			  layerName: 'visibilityPoint',
			  wrapX: false,
			  minResolution: 0,
			  maxResolution: 400000,
			  visible: true,
			  style: pointStyleFunction
		})

	return visDataLayer	
	}


	function makeFirePointsLayer(data){
		// if(!data){
		// 	// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
		// }
		// else(
		// 	console.log('nowImhere')
		// )
		// console.log('data', data)
		var source = new VectorSource({
		  features: (new GeoJSON()).readFeatures(data, {
		    dataProjection : 'EPSG:4326', 
		    featureProjection: 'EPSG:3857'
		  })  
		});


		// const fireLayer = new VectorLayer({
		// 	  source: source, 
		// 	  wrapX: false,
		// 	  minResolution: 0,
		// 	  maxResolution: 400000,
		// 	  visible: true,
		// 	  style: new Style({
		// 		  image: new CircleStyle({
		// 		    radius: 5,
		// 		    fill: new Fill({
		// 		      color: 'pink'
		// 		    }),
		// 		    stroke: new Stroke({
		// 		      color: 'red',
		// 		      width: 2
		// 		    })
		// 		  }),
		// 		})
		// })
		const fireLayer = new VectorLayer({
			  source: source, 
			  layerName: 'fireLayer',
			  wrapX: false,
			  minResolution: 0,
			  maxResolution: 400000,
			  visible: true,
			  style: new Style({
				  image: new Icon({
				    crossOrigin: 'anonymous',
				    // imgSize: [25, 25],
				    src: iconImage
				    // src: './layers/circleArrow.png' 
				  })
				})
		})

	return fireLayer	
	}

	function makeSmokeLayer(data){
		var smokeLayerSource = new VectorSource({
		  features: (new GeoJSON()).readFeatures(data, {
		    dataProjection : 'urn:ogc:def:crs:OGC:1.3:CRS84', 
		    featureProjection: 'EPSG:3857'
		  })  
		});

		const smokeLayer = new VectorLayer({
		  source: smokeLayerSource, 
		  layerName: 'smokeLayer',
		  wrapX: false,
		  visible: true,
		  style: new Style({
		    fill: new Fill({
		      color: [51, 51, 51, 0.10]
		     }),
		    stroke: new Stroke({
		      color: 'grey',
		      width: 0.5
		    })
		   })
		})

		return smokeLayer
	}

  
	useEffect(() => {
		// console.log('mapRef', mapContainer)
		// console.log('mapRef', mapContainer.current)
		const overlay = new Overlay({
		    element: popupRef.current,
		    autoPan: true,
		    autoPanAnimation:{
		      duration: 250
		    },
		    stopEvent: false
		  })
		olMap.setTarget(mapContainer.current)
		olMap.addOverlay(overlay)
		olMap.on('click', evt => {
			// console.log('evt pointer event', Object.keys(evt.originalEvent), evt.originalEvent.path[0], evt.originalEvent.path[0].getAttribute('href'))
			if(evt.originalEvent.path[0].getAttribute('href')){
				// console.log('i will now disappear')
	  		popupRef.current.style.visibility="hidden"
	  		// overlay.set({visibility:false})
	  		// overlay.setPosition([-12132560.62148373, 6086969.281949262])
	  		// popupRef.current.style.visibility = false
	  		// overlay.setPosition(undefined)
	  		return false
	  	}
	  	if(popupRef.current.style.visibility==="hidden"){
	  		popupRef.current.style.visibility = "visible"
	  	}
			// console.log('clicked on the map')
			const pixel = evt.pixel
			const coordinate = evt.coordinate
			var hdms = toStringHDMS(toLonLat(coordinate));
			const target = evt.target
			
			// console.log('target', target)
			// olMap.forEachLayerAtPixel(pixel,g=>{if(g.getProperties().layerName && g.getProperties().layerName === 'visibilityPoint'){
			// 		return true
			// 	}},{hitTolerance:2} )
			const features = olMap.getFeaturesAtPixel(pixel)
			// if(popupRef.current.style.visibility==="hidden"){
	  // 		popupRef.current.style.visibility = "visible"
	  // 	}
			features.map(currFeature => {
				// console.log('currFeature', currFeature)
				if(currFeature.values_.data &&  currFeature.values_.data === 'METAR'){

					overlay.setPosition(coordinate)
					const {visib, id, site, fltcat, obsTime, wspd, ceil, wdir, wx } = currFeature.values_
					setPopupContent({ ...currFeature.values_ })
					// console.log('overlay', overlay, 'popupRef', popupRef)
				}
			})
		})
		
	},[])
	useEffect(() => {
		if(context.firePoints){
			// console.log('there is aqi data')
			const firePointsLayer = makeFirePointsLayer(context.firePoints)
			olMap.addLayer(firePointsLayer)
		}
		else{
			console.log('theres no aqi data')
		}
	},[context.firePoints])
	useEffect(() => {
		if(context.smokeData){
			// console.log('there is aqi data')
			const smokeLayer = makeSmokeLayer(context.smokeData)
			olMap.addLayer(smokeLayer)
		}
		else{
			console.log('theres no smoke data')
		}
	},[context.smokeData])
	useEffect(() => {
		if(context.visiblityData){
			// console.log('there is visiblityData data',context)
			const visibilityLayer = makeVisibilityLayer(context.visiblityData)
			olMap.addLayer(visibilityLayer)
		}
		else{
			console.log('theres no aqi data')
		}
	},[context.visiblityData])

	
	
	// useEffect(() => {
	// 	if(context.smokeData){
	// 		console.log('there is aqi data')
	// 		const smokeLayer = makeSmokeLayer(context.smokeData)
	// 		olMap.addLayer(smokeLayer)
	// 	}
	// 	else{
	// 		console.log('theres no aqi data')
	// 	}
	// },[context.smokeData])
	

	return(
		<Container fluid style={{height:`${props.height}px`}}> 
   		<div id = "map" ref={ mapContainer } style={{height:`${props.height}px`}}>
   			<Navbar expand="lg" variant="light" className = "visBar">
		    	Airport names are color-coded by the current flight category as follows: 
		    		<mark className = "vfr outline"> <b>vfr</b> </mark> 
		    		<mark className = "mvfr outline"><b>mvfr</b> </mark> 
		    		<mark className = "ifr outline"><b>ifr</b> </mark> 
		    		<mark className = "lifr outline"><b>lifr</b> </mark> 
		  	</Navbar>
			  <div className="absBotRight"><Legend mapType = 'airQuality'/></div> 
		  </div>
		  <div id="popup" className="ol-popup" ref = {popupRef} > 
	        <a href="#" id="popup-closer" className="ol-popup-closer" ref = {popupCloserRef} ></a>
	        <div id="popup-content" ref = {popupContentRef}><PopupInside all={popupContent}/></div> 
	      </div>
 		</Container>
	)
}

export default VisibilityMap


    	// <div id = "map" style={{height:'700px'}} ref={ mapContainer } />
    	//<div style={{paddingTop:'75px'}}>
		  //	<Spinner animation="border" role="status" size="lg">
			//	  <span className="sr-only">Loading...</span>
			//	</Spinner>
			//</div>	
