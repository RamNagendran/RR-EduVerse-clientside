import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { confirmModalStyles } from "./utils/confirm-modal-styles";
import EyeOpen from '../assets/images/SVGs/eye-open.svg';
import EyeClosed from '../assets/images/SVGs/eye-closed.svg';
import { validatePassword } from "./utils/password-validate";

const PasswordConfirmModal: React.FC<{
    name?: string;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<{ update: boolean, delete: boolean }>>;
    authenticatedPassword: string;
    setAuthenticatedPassword: React.Dispatch<React.SetStateAction<string>>;
    onConfirm: () => Promise<void>;
}> = ({ name, show, setShow, authenticatedPassword, setAuthenticatedPassword, onConfirm }) => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);

    const handleCancel = () => {
        setIsInvalidPassword(false);
        setShow({ update: false, delete: false });
        setAuthenticatedPassword('');
    };

    return (
        <Modal show={show} >
            <Modal.Header style={{ backgroundColor: "#002855", color: "#fff" }} closeButton>
                <Modal.Title style={{ fontSize: "14px", fontWeight: 700 }} >Are you sure you want to update/delete?</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: "180px" }} className="d-flex flex-column justify-content-evenly" >
                <div style={confirmModalStyles.warning}>
                    {`Confirm your identity to modify/remove for ${name}. Please enter your password to proceed.`}
                </div>
                <div style={confirmModalStyles.input} >
                    <input
                        style={{
                            ...confirmModalStyles.inputBox,
                            border: isInvalidPassword ? '1px solid red' : '1px solid #ccc'
                        }}
                        name='password'
                        onChange={(e) => { setIsInvalidPassword(false); setAuthenticatedPassword(e.target.value) }}
                        type={passwordVisibility ? 'text' : 'password'}
                        placeholder='Enter your password' />
                    <img
                        alt="eye-icon"
                        src={passwordVisibility ? EyeOpen : EyeClosed}
                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                        style={confirmModalStyles.eyeIcon}
                    />
                </div>
                {isInvalidPassword && <div style={confirmModalStyles.error} >Please enter a valid password!</div>}
            </Modal.Body>
            <Modal.Footer style={{ borderTop: "none" }} >
                <Button style={confirmModalStyles.cancel} onClick={handleCancel}>
                    Cancel
                </Button>
                <Button style={confirmModalStyles.confirm} onClick={() => {
                    if (!validatePassword(authenticatedPassword)) {
                        setIsInvalidPassword(true);
                        return;
                    }
                    onConfirm();
                }}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PasswordConfirmModal;