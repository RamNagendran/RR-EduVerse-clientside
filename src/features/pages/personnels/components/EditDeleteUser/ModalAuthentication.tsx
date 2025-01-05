import React,{useCallback, useState, Dispatch} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../scss/edit-delete-user.scss"
import {confirmModalStyles} from "../utils/common";
import EyeOpen from '../../../../../assets/images/SVGs/eye-open.svg';
import EyeClosed from '../../../../../assets/images/SVGs/eye-closed.svg';

interface ToggleChanges {
    toggleSaveChanges: boolean,
    toggleRevertChanges: boolean,
    toggleDelete: boolean
}

interface ModalAuthenticationProp {
    toggleChanges: ToggleChanges
    role_id: number | null;
    onConfirm: () => void;
    handleConfirmDelete: () => Promise<void>;
    setToggleChanges: Dispatch<React.SetStateAction<ToggleChanges>>
    setAuthenticatedPassword: Dispatch<React.SetStateAction<string>>
}
const ModalAuthentication = ({toggleChanges,role_id,onConfirm,handleConfirmDelete,setToggleChanges,setAuthenticatedPassword}: ModalAuthenticationProp) => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const roleName = useCallback(() => {
        switch(role_id){
            case 101:
                return "Admin"
            case 102:
                return "Trainer"
            case 103:
                return "Counselor"
            case 104:
                return "Placement"
            case 105:
                return "Student"
            default:
                return "ERROR::Not Found"
        }
    }, [role_id])

    const handleCancel = () => {
        setToggleChanges((prev) => ({...prev,toggleSaveChanges: false}))
        setToggleChanges((prev) => ({...prev,toggleDelete: false}))
    }

    const onConfirmModal = async () => {
        try {
            if (toggleChanges.toggleSaveChanges) {
                onConfirm();
            }
            if (toggleChanges.toggleDelete) {
                handleConfirmDelete();
            }
        } catch (error) {
            console.error('Error in onConfirmModal:', error); // Log any errors
        }
    }

    return (
        <Modal show={toggleChanges.toggleSaveChanges || toggleChanges.toggleDelete} >
            <Modal.Header style={{ backgroundColor: "#002855", color: "#fff" }}>
                <Modal.Title style={{ fontSize: "14px", fontWeight: 700 }} >Are you sure you want to update?</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: "150px" }} className="d-flex flex-column justify-content-between" >
                <div style={confirmModalStyles.warning}>
                    {`Confirm your identity to modify ${roleName()} detail. Please enter your password to proceed.`}
                </div>
                <div style={confirmModalStyles.input} >
                    <input
                        style={confirmModalStyles.inputBox}
                        name='password'
                        onChange={(e) => setAuthenticatedPassword(e.target.value)}
                        type={passwordVisibility ? 'text' : 'password'}
                        placeholder='Enter your password' />
                    <img
                        alt="eye-icon"
                        src={passwordVisibility ? EyeOpen : EyeClosed}
                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                        style={confirmModalStyles.eyeIcon}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: "none" }} >
                <Button style={confirmModalStyles.cancel} onClick={handleCancel}>
                    Cancel
                </Button>
                <Button style={confirmModalStyles.confirm} onClick={onConfirmModal}>
                    Confirm
                </Button> 
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAuthentication