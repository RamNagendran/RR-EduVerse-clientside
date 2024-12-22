import React,{useState} from 'react';
import './scss/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import AddUser from './AddUser';

const Personnel: React.FC = () => {
    const [openModal,setOpenModal] = useState<boolean>(false)

    const handleClick = () => {
        setOpenModal(true)
    }

    return (
        <div className='personnel'>
            <div className='header'>
                <div className='title' >Personnel Managements</div>
                <Button className='add-button' onClick={handleClick} >ADD NEW </Button>
            </div>
            {openModal && <AddUser openModal={openModal} setOpenModal={setOpenModal} />}
        </div>
    );
};

export default Personnel;