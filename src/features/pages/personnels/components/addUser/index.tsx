// AddUser.tsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from "moment";
import { addUserAPI } from '../../api/users.api';
import UserForm from './user-form';
import { IBaseResponse, IPASSWORD_INITIALS, Iuser, IUserDetailsSchema } from '../../types/personnel.type';
import { useSelector } from 'react-redux';

type IResponse = IBaseResponse<Iuser[]> | IBaseResponse;

interface AddUserProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  getUsers: () => Promise<void>;
}

const INITIAL_USER_DETAILS: Iuser = {
  username: "",
  email: "",
  phone: null,
  firstname: "",
  lastname: "",
  password: "",
  added_by: "",
  added_at: moment().format('DD/MM/YYYY HH:mm:ss'),
  role_id: null
}

const INITIAL_USER_SCHEMA: IUserDetailsSchema = {
  username: false,
  email: false,
  phone: false,
  firstname: false,
  lastname: false,
  password: false,
  confPassword: false,
  role_id: false,
  passwordRequirement: false
}

const PASSWORD_INITIALS: IPASSWORD_INITIALS = {
  confPassword: "",
  isGeneratedToggled: false,
  isPasswordSame: true,
  isUsernameShort: false
}

const AddUser: React.FC<AddUserProps> = ({ getUsers, openModal, setOpenModal }) => {
  const {user} = useSelector((state: any) => state.auth);
  const [userDetails, setUserDetails] = useState<Iuser>(INITIAL_USER_DETAILS);
  const [userDetailsSchema, setUserDetailsSchema] = useState<IUserDetailsSchema>(INITIAL_USER_SCHEMA);
  const [passwordDetails, setPasswordDetails] = useState<IPASSWORD_INITIALS>(PASSWORD_INITIALS)
  const [error, setError] = useState(true);
  const [errorDetails, setErrorDetails] = useState<string>("")

  const validateForm = (): boolean => {
    const requiredFields: (keyof Iuser)[] = [
      'username', 'email', 'phone',
      'firstname', 'lastname', 'password', 'role_id'
    ];
    const missingFields = requiredFields.reduce((acc: any, field) => {
      if (!userDetails[field]) acc[field] = true;
      return acc;
    }, {} as Partial<IUserDetailsSchema>);

    if (Object.keys(missingFields).length > 0) {
      setUserDetailsSchema(prev => ({ ...prev, ...missingFields }));
      if (passwordDetails.confPassword === "") setUserDetailsSchema(prev => ({ ...prev, confPassword: true }));
      return false;
    }
    if (passwordDetails.confPassword !== userDetails.password) {
      setPasswordDetails(prev => ({ ...prev, isPasswordSame: false }));
      return false;
    }
    return true;
  };

  const handleClick = async () => {
    setError(false)
    if (!validateForm()) return;
    const finalUserDetails = {...userDetails,added_by: user.user_id}
    const response: IResponse = await addUserAPI(user.username, user.role_id, finalUserDetails);
    if (!response.success || response?.status !== 200) {
      setError(true)
      setErrorDetails(response?.message || "Something unexpected happened, please try again later")
      return
    }
    setOpenModal(false)
    // to fetch again all the users...
    getUsers()
  }

  const handleChange = (e: (React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)) => {
    let { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: (name === "role_id" || name === "phone")  ? Number(value) : value }))
    setUserDetailsSchema((prev) => ({ ...prev, [name]: false }))
  }

  const toggleGeneratePassword = () => {
    if (passwordDetails.isGeneratedToggled) {
      setPasswordDetails((prev) => ({ ...prev, isGeneratedToggled: false }))
      return;
    }
    if(userDetails["username"].length < 1){
      setPasswordDetails((prev) => ({ ...prev, isUsernameShort: true }))
    }else{
      setPasswordDetails((prev) => ({ ...prev, isGeneratedToggled: true }))
    }
  }

  return (
    <Modal className='add-user' show={openModal} backdrop='static' onHide={() => setOpenModal(false)} centered>
      <Modal.Header className='add-user-header' closeButton>
        <Modal.Title className='title'>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body className='add-user-body'>
        <UserForm
          error={error}
          userDetails={userDetails}
          errorDetails={errorDetails}
          passwordDetails={passwordDetails}
          userDetailsSchema={userDetailsSchema}
          toggleGeneratePassword={toggleGeneratePassword}
          setUserDetailsSchema={setUserDetailsSchema}
          setPasswordDetails={setPasswordDetails}
          setUserDetails={setUserDetails}
          handleChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer className='add-user-footer'>
        <Button className='add-user-button add' variant="primary" onClick={handleClick}>Add</Button>
        <Button className='add-user-button close' variant="secondary" onClick={() => setOpenModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUser;
