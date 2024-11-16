import React, {useState, useEffect} from 'react'
import { Carousel, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import CarouselContent from './Store/CarouselContent'


function Store( props ) {
  return (
    <div>
        <div className="store-container">
            <Row>
                <Col xs={12} >
                    <h1 className="text-center">Store</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h3 className="text-center">Theme Store</h3>
                    <CarouselContent { ...props }/>
                </Col>
                <Col xs={12}>
                    <h3 className="text-center">Game Store</h3>
                </Col>
                <Col xs={12}>
                    <h3 className="text-center">Avatar Store</h3>
                </Col>
            </Row>
        </div>

    </div>
  )
}

export default Store