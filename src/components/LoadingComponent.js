import React from 'react';
import {Container, Spinner} from 'react-bootstrap'

function LoadingComponent(){
	return(
		<div style={{paddingTop:'75px'}}>
		 	<Spinner animation="border" role="status" size="lg">
			  <span className="sr-only">Loading...</span>
			</Spinner>
		</div>	
	)

}

export default LoadingComponent