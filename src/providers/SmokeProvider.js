

import React, { useState, useEffect } from 'react'
import { SmokeContext } from '../contexts/SmokeContext'
import axios from 'axios'

export default function MapProvider({children}) {
	const [map, setMap] = useState()
	// const [activeContent, setActiveContent] = useState('aqMap') 
	// const [activeContent, setActiveContent] = useState('nrSfc') 
	const [activeContent, setActiveContent] = useState('visibilityMap') 
	const [textInfo, setTextInfo] = useState()
	const [newTextInfo, setNewTextInfo] = useState()
  const [containerWidth, setContainerWidth] = useState();
  const [mapHeight, setMapHeight] = useState(800);
  const [tabHeight, setTabHeight] = useState()
  const [jumboHeight, setJumboHeight] = useState()
  const [windowHeight, setWindowHeight] = useState()
  const [aqiData, setAqiData] = useState()
  const [smokeData, setSmokeData] = useState()
  const [firePoints, setFirePoints] = useState()
  const [updateTime, setUpdateTime] = useState()
  const [visiblityData, setVisiblityData] = useState()

  	useEffect(() => {
			const getText = async() =>{
				console.log('getting text data')
				const textData = await axios.get('https://sxhwincc37.execute-api.us-west-1.amazonaws.com/dev/getInfo/')
				// console.log('textData', textData)
				setTextInfo(textData.data)
			}
			getText()
		}, [])

	// useEffect(() => {
	// 	const getText = async() =>{
	// 		const textData = await axios.get('https://sxhwincc37.execute-api.us-west-1.amazonaws.com/dev/getInfo')
	// 		setTextInfo(textData.data)
	// 	}
	// 	const getAqiData = async() =>{
	// 		const airData = await axios.get('https://sxhwincc37.execute-api.us-west-1.amazonaws.com/dev/getAirQuality')
	// 		console.log('airData from provider', airData)
	// 		setAqiData(airData.data)
	// 	}
	// 	const getSmokeLayer = async() => {
	// 		const smokeData = await axios.get('https://s3-us-west-2.amazonaws.com/airfire-data-exports/hms/v1/geojson/latest_smoke.geojson')
	// 		console.log('smokeData from provider', smokeData)
	// 		setSmokeData(smokeData.data)
	// 	}
	// 	const getFires = async() => {
	// 		const latestFires = await axios.get('https://s3-us-west-2.amazonaws.com/airfire-data-exports/maps/NIFC/points/latest_nifc_points.geojson')
	// 		setFirePoints(latestFires.data)
	// 	}

	// 	getText()
	// 	getAqiData()
	// 	getSmokeLayer()
	// 	getFires()
	// },[])

	const requestAndSet = async dataSourceInfo => {
		// console.log('dataSourceInfo', dataSourceInfo)
		const { url, setter } = dataSourceInfo
		let dataBack = await axios.get(url)
			.then(res => {
				// console.log('res', res.data, dataSourceInfo, res)
				setter(res.data)
			})
	}

	useEffect(() => {
		const urlObject = {
			textData: {
				url: 'https://sxhwincc37.execute-api.us-west-1.amazonaws.com/dev/getInfo/',
				setter: setTextInfo,
				name: 'TextData'
			},
			aqData: {
				url: 'https://sxhwincc37.execute-api.us-west-1.amazonaws.com/dev/getAirQuality',
				setter: setAqiData,
				name: 'aqData'
			},
			smokeLayer: {
				url:'https://s3-us-west-2.amazonaws.com/airfire-data-exports/hms/v1/geojson/latest_smoke.geojson',
				setter: setSmokeData,
				name:'smoke data'
			},
			fireData: {
				url: 'https://s3-us-west-2.amazonaws.com/airfire-data-exports/maps/NIFC/points/latest_nifc_points.geojson',
				setter: setFirePoints,
				name: 'fire data'
			},
			visiblityData: {
				url: 'https://sxhwincc37.execute-api.us-west-1.amazonaws.com/dev/metarData',
				setter: setVisiblityData,
				name: 'visibility data'
			}
		}
		async function getAllData(){
			const objKeys = Object.keys(urlObject)
			const returnedData = await Promise.allSettled(
				objKeys.map(dataType => {
					// console.log('dataType', dataType)
					requestAndSet(urlObject[dataType])
				})
			)
		}
		getAllData()

	}, [])

	useEffect(() =>{
		if(textInfo && textInfo.updateTime){
			
			setUpdateTime(new Date(textInfo.updateTime))
		}
	}, [textInfo])

	useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      // setWindowSize({
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // });
      setWindowHeight(window.innerHeight)
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
	return (
		<SmokeContext.Provider value={{ map, setMap, activeContent, setActiveContent, textInfo, containerWidth, setContainerWidth, mapHeight, setMap, tabHeight, setTabHeight, jumboHeight, setJumboHeight, windowHeight, aqiData, smokeData, firePoints, updateTime, visiblityData }}>
			{ children }
		</SmokeContext.Provider>
	)
}
