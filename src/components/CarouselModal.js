import React, { useState, useEffect, useContext } from 'react';
import {Modal, Button} from 'react-bootstrap';
import ImageCarousel from './ImageCarousel'
import { SmokeContext } from '../contexts/SmokeContext'

import './tabStyle.css'

function CarouselModal() {
  const [show, setShow] = useState(false);
  const [modalWidth, setModalWidth] = useState(false);
  const context = useContext(SmokeContext)


  useEffect(() => {
    setModalWidth(context.containerWidth)
  }, [context.containerWidth])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const StyledWrap = styled.div`
  //   & .nav-tabs > .active > li {
  //     background: white;
  //   }

  //   & .nav-tabs > .active.colorize > li {
  //     background: orange;
  //   }
  // `

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} className="bigModal" contentClassName="bigModal">
        <ImageCarousel />
        
        <Modal.Footer>
          There will be great text here. it will be fabulous
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CarouselModal

      // <Modal show={show} onHide={handleClose} className="bigModal" dialogClassName="bigModal">
