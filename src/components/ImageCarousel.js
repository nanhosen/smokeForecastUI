import React, { useState } from 'react';
import {Carousel, Card} from 'react-bootstrap';

function ImageCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} >
      <Carousel.Item>
        <Card className = "card text-left" style={{width:'1000px'}}>
          <Card.Header as="h4" style={{backgroundColor:'white'}}>HRRR Near Surface Smoke Forecast - Experimental</Card.Header>
          <Card.Body>
            <img
              className="d-block w-100"
              src="https://gacc.nifc.gov/gbcc/predictive/smokeForecast/testDisplay/day1Model.png"
              alt="First slide"
            />
              <Card.Text>
                <small>Impaired air quality in the Kern river valley will continue today and the next several days. Kernville and Johnsondale, will see Unhealthy to Hazardous conditions from very early morning until the smoke clears mid-day. Kennedy Meadows, Keeler and Lone Pine will start the day with Good conditions but may see periods of Unhealthy. Elsewhere in the outlook area, expect a generally Moderate day.</small>
              </Card.Text>
          </Card.Body>
        </Card>
        
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Card className = "card text-left" style={{width:'1000px'}} >
          <Card.Header as="h4" style={{backgroundColor:'white'}}>HRRR Near Surface Smoke Forecast - Experimental</Card.Header>
          <Card.Body>
            <img
              className="d-block w-100"
              src="https://gacc.nifc.gov/gbcc/predictive/smokeForecast/testDisplay/day1Model.png"
              alt="First slide"
            />
              <Card.Text>
                <small>Impaired air quality in the Kern river valley will continue today and the next several days. Kernville and Johnsondale, will see Unhealthy to Hazardous conditions from very early morning until the smoke clears mid-day. Kennedy Meadows, Keeler and Lone Pine will start the day with Good conditions but may see periods of Unhealthy. Elsewhere in the outlook area, expect a generally Moderate day.</small>
              </Card.Text>
          </Card.Body>
        </Card>
        
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Card className = "card text-left" style={{width:'1000px'}} >
          <Card.Header as="h4" style={{backgroundColor:'white'}}>HRRR Near Surface Smoke Forecast - Experimental</Card.Header>
          <Card.Body>
            <img
              className="d-block w-100"
              src="https://gacc.nifc.gov/gbcc/predictive/smokeForecast/testDisplay/day1Model.png"
              alt="First slide"
            />
              <Card.Text>
                <small>Impaired air quality in the Kern river valley will continue today and the next several days. Kernville and Johnsondale, will see Unhealthy to Hazardous conditions from very early morning until the smoke clears mid-day. Kennedy Meadows, Keeler and Lone Pine will start the day with Good conditions but may see periods of Unhealthy. Elsewhere in the outlook area, expect a generally Moderate day.</small>
              </Card.Text>
          </Card.Body>
        </Card>
        
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageCarousel

