import React, {  useEffect, useContext, useState } from 'react';
import { SmokeContext } from '../contexts/SmokeContext'
import {Container, Card, CardGroup, Nav} from 'react-bootstrap';
import CarouselModal from './CarouselModal.js'
import './tabStyle.css'

function ImageCard(props) {
	const { imageLink, day, dayText, updateTime } = props.props
	// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  	// console.log('image link', imageLink)
  return (
  		  <Card>
			    <Nav.Link href={imageLink}><Card.Img className = "modelImage" variant="top" src={imageLink}  /></Nav.Link>
			    <Card.Body>
			    <Card.Title>{day}</Card.Title>
			      <Card.Text>
				      <small>{dayText}</small>
			      </Card.Text>
			    </Card.Body>
			    <Card.Footer>
			      <small className="text-muted">
			      	{updateTime}
			      </small>
			    </Card.Footer>
			  </Card>
			  
  );
}

export default ImageCard


