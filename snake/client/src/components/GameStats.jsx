import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


function GameStats() {
  return (
    <div>
        <div className="game-stat-container">
            <Row>
                <Col>
                    <h1 className="text-center">GameStats</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={12} xl={6}>
                    <h3 className="text-center">Game 1 stat</h3>
                </Col>
                <Col lg={12} xl={6}>
                    <h3 className="text-center">Game 2 stat</h3>
                </Col>
            </Row>
        </div>

    </div>
  )
}

export default GameStats