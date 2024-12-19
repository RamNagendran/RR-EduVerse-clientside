import React from 'react';
import './scss/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import MenuBar from './menuBar';
import StaticHeader from './header';

const Home: React.FC = () => {
    return (
        <div className='Home d-flex' style={{ background: "rgb(240 240 240)" }}>
            <MenuBar />
            <div className="w-100 d-flex flex-column">
                <StaticHeader />
                <Row className="h-100 w-100 g-0 p-3">
                    <Col>
                        <Outlet /> 
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Home;