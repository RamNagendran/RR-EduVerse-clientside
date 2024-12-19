import React from 'react';
import './scss/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const Personnel: React.FC = () => {
    return (
        <div className='personnel'>
            <div className='header'>
                <div className='title' >Personnel Managements</div>
                <Button className='add-button' >ADD NEW </Button>
            </div>
        </div>
    );
};

export default Personnel;