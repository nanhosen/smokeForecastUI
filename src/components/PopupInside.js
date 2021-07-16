import React from 'react';

function ordinal_suffix_of(i) {
  if(typeof i !== 'number'){
    return 'No Data'
  }
  else{
    i = parseFloat(i.toFixed(0))
    var j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd"; 
    }
    return i + "th";
  }
  
}

function renderTitle(site){
  return <div > <b>{site}</b> </div>
}

function renderVisibility(visibility){
  return <div > <b>visibility: {visibility}</b> </div>
}

function renderSite(site='', id=''){
  return <div>{site} ({id})</div>
}

function renderInfo(element,val){
  return <div> <b>{ `${element.label}`}</b> {`${val} ${element.units}`} </div>
}




export default function PopupInside(props) {
  // console.log(props, 'props')

  // console.log('props', props)
  var { visib, id, site, fltcat, obsTime, wspd, ceil, wdir, wx } = props.all
  // var  visibility, id, name 
  console.log(visib, id, site)
  const returnObj = {
    visib: {
      label: 'Visibility: ',
      units: 'SM'
    },
    id: {
      label: 'ID: ',
      units: ''
    },
    fltcat: {
      label: 'Flight Category: ',
      units: ''
    },
    obsTime: {
      label: 'Observation Time: ',
      units: ''
    },
    wspd: {
      label: 'Wind Speed: ',
      units: 'kts'
    },
    wdir: {
      label: 'Wind Direction: ',
      units: ''
    }
  }

  const insideComponent = Object.keys(returnObj).map(key => {
    console.log('props', props, props['all'][key])
    return renderInfo(returnObj[key], props['all'][key])
  })

  const titlePart = renderTitle(site)
  // var nameText = name + 'RAWS (' + id + ')'
  // if(name === undefined || name === null){
  //   nameText = id ? 'RAWS ' + id : 'No Data'
  // }
  // console.log('PopupInside props', props.all)
  // var title = renderTitle(name, id)
  var visibilityText = renderVisibility(visib)
  var siteText = renderSite(site, id)
  // if(downText && downVal && erc && id && name && percentile && trend && upText && upVal){
  //   var displayAr = 
  // }
  return <div> 

      { titlePart }{ insideComponent }
    </div>
}

// App.propTypes = {
//   name: PropTypes.number
// }

 // return <div> 
 //      <b>{downText}: {downVal}</b>
 //      <br />
 //      <b>{upText}: {upVal}</b>
 //    </div>