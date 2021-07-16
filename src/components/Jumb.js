import React, { useRef, useEffect, useState, useContext } from 'react';
import {Jumbotron, Container} from 'react-bootstrap';
import Background from './smokeBig.jpg';
import { SmokeContext } from '../contexts/SmokeContext'


function Jumb() {
	const containerRef = useRef()
	const jumboRef = useRef()
  const context = useContext(SmokeContext)

  useEffect(()=>{
  	if(containerRef.current){
  		// console.log('containerRef', containerRef.current.clientWidth)
  		context.setContainerWidth(containerRef.current.clientWidth)
  	}
  	if(jumboRef.current && jumboRef.current.clientHeight){
  		context.setJumboHeight(jumboRef.current.clientHeight)
  		// console.log('jub', jumboRef.current.clientHeight)
  	}
  },[context.windowHeight])

  return (
		<Jumbotron fluid ref = {jumboRef} style={{marginBottom:'0px', backgroundImage: `url(${Background})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
		  <Container ref={containerRef}>
		    <h1>Smoke and Air Quality</h1>
		  </Container>
		</Jumbotron>
  	  		// <Navbar.Collapse>
  			// <Container>
  				// <div className="row">
		        // <div className="col-sm-8 col-md-7 py-4">
		          // <h4 className="text-white">About</h4>
		          // <p className="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
		        // </div>
		        // <div className="col-sm-4 offset-md-1 py-4">
		          // <h4 className="text-white">Contact</h4>
		          // <ul className="list-unstyled">
		            // <li><a href="#" className="text-white">Follow on Twitter</a></li>
		            // <li><a href="#" className="text-white">Like on Facebook</a></li>
		            // <li><a href="#" className="text-white">Email me</a></li>
		          // </ul>
		        // </div>
		      // </div>
  			// </Container>
  		// </Navbar.Collapse>


    // <Navbar bg="dark" variant = "dark" expand="lg">
    //   <Navbar.Brand href="#home"><h5>NRCC ERC Percentile Map</h5></Navbar.Brand>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
    // </Navbar>
  );
}

export default Jumb

		// <Jumbotron fluid style={{marginBottom:'0px', backgroundImage: `url(${Background})`}}>
		// <Jumbotron fluid style={{marginBottom:'0px', backgroundColor:'#f7f7f7'}}>



