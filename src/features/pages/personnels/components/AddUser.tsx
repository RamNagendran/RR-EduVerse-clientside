// AddUser.tsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { IUserDetails, IUserDetailsSchema } from './types/adduser.types';
import { addUserAPI } from '../api/adduser.api';
import AddUserPassword from './AddUser-password';
import AddUserError from './AddUser-Error';
import moment from "moment";

interface AddUserProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUser: React.FC<AddUserProps> = ({ openModal, setOpenModal }) => {
  const [userDetails,setUserDetails] = useState<IUserDetails>({
    username: "",
    email: "",
    phone: null,
    firstname: "",
    lastname: "",
    password: "",
    // addedby: "",
    added_at: moment().format('DD-MM-YYYY HH:mm:ss'),
    role_id: null
  })
  const [userDetailsSchema,setUserDetailsSchema] = useState<IUserDetailsSchema>({
    username: false,
    email: false,
    phone: false,
    firstname: false,
    lastname: false,
    password: false,
    confPassword: false,
    role_id: false,
  })
  const [confPassChange,setConfPassChange] = useState<string>("")
  const [isPasswordSame,setIsPasswordSame] = useState<boolean>(true)
  const [isGenerateToggled,setIsGenerateToggled] = useState<boolean>(false)
  const [error, setError] = useState(true);
  const [errorDetails, setErrorDetails] = useState<string>("")

  const handleAddClick = () => {
    setError(false)
    const missingFields: Record<string, boolean> = {};

    if (!userDetails.username) missingFields.username = true;
    if (!userDetails.email) missingFields.email = true;
    if (!userDetails.phone) missingFields.phone = true;
    if (!userDetails.firstname) missingFields.firstname = true;
    if (!userDetails.lastname) missingFields.lastname = true;
    if (!userDetails.password) missingFields.password = true;
    if (!confPassChange) missingFields.confPassword = true
    if (!userDetails.role_id) missingFields.role_id = true;

    if (Object.keys(missingFields).length > 0) {
      setUserDetailsSchema((prev) => ({ ...prev, ...missingFields }));
      return
    }

    if(confPassChange != userDetails.password){
      setIsPasswordSame(false)
      return
    }
    addUserAPI({userDetails,setError,setErrorDetails,setOpenModal})
  }

  const handleChange = (e:(React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>)) => {
    const { name, value } = e.target;
    if(name == 'role'){
      setUserDetailsSchema((prev) => ({...prev,role_id:false}))
      let role_id: (number | null) = 101;
      if(value === "Admin"){
        role_id = 101
      }else if(value === "Trainer"){
        role_id = 102
      }else if(value === "Counselor"){
        role_id = 103
      }else if(value === "Placement"){
        role_id = 104
      }else if(value === "Student"){
        role_id = 105
      }
      setUserDetails((prev) => ({...prev,role_id:role_id}))
    }else{
      setUserDetails((prev) => ({...prev,[name]:value}))
      setUserDetailsSchema((prev) => ({...prev,[name]:false}))
    }
  }

  const toggleGeneratePassword = () => {
    if(isGenerateToggled){
      setIsGenerateToggled(false)
    }else{
      setIsGenerateToggled(true)
    }
  }

  return (
    <Modal className='add-user' show={openModal} backdrop='static' onHide={() => setOpenModal(false)}  centered>
      <Modal.Header className='add-user-header' closeButton>
        <Modal.Title className='title'>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body className='add-user-body'>
        <form className='add-user-form'>
          {error ? <AddUserError errorDetails={errorDetails} setErrorDetails={setErrorDetails}/> : null}
          <div className='form-row'>
            <div className='label'><span>*</span> Username :</div>
            <div className='input'><input className='input-box' type='text' name='username' onChange={(e) => handleChange(e)} placeholder='username' value={userDetails.username}/>
            </div>
            {userDetailsSchema.username ? <label className='not-provided'>* please enter username</label> : null}
          </div>
          <div className='form-row-name'>
              <div className='name'>
                <div className='label'><span>*</span> Firstname :</div>
                <div className='input'><input name='firstname' onChange={(e) => handleChange(e)} className='input-box' type='text' placeholder='firstname' value={userDetails.firstname}/></div>
                {userDetailsSchema.firstname ? <label className='not-provided'>* please enter firstname</label> : null}
              </div>
              <div className='name'>
                <div className='label'><span>*</span> Lastname :</div>
                <div className='input'><input className='input-box' name='lastname' onChange={(e) => handleChange(e)} type='text' placeholder='lastname' value={userDetails.lastname}/></div>
                {userDetailsSchema.lastname ? <label className='not-provided'>* please enter lastname</label> : null}
              </div>
          </div>
          <div className='form-row'>
            <div className='label'><span>*</span> Email :</div>
            <div className='input'><input className='input-box' name='email' onChange={(e) => handleChange(e)} type='email' placeholder='email (ex:abc@xyz.pqr)' value={userDetails.email}/></div>
            {userDetailsSchema.email ? <label className='not-provided'>* please enter email ID</label> : null}
          </div>
          <div className='form-row'>
            <div className='label'><span>*</span> Phone no :</div>
            <div className='input'><input name='phone' onChange={(e) => handleChange(e)} className='input-box' type='tel' placeholder='phone no.' value={userDetails.phone ?? ""}/></div>
            {userDetailsSchema.phone ? <label className='not-provided'>* please enter phone number</label> : null}
          </div>
          <div className='form-row'>
              <AddUserPassword 
                userDetailsSchemaPassword={userDetailsSchema.password} 
                userDetailsSchemaConfPassword={userDetailsSchema.confPassword} 
                userDetailsPassword={userDetails.password} 
                isPasswordSame={isPasswordSame} 
                confPassChange={confPassChange} 
                isGeneratedToggled={isGenerateToggled}
                setUserDetailSchema={setUserDetailsSchema}
                setUserDetails={setUserDetails}
                setConfPassChange={setConfPassChange} 
                handleChange={handleChange}
              />
            <div>
              <Button className='generateButton' onClick={toggleGeneratePassword}>{isGenerateToggled ? 'Custom Password' : 'Generate Password'}</Button>
            </div>
          </div>
          {/* <div className='form-row'>
            <div className='label'>Added By :</div>
            <div className='input'><input className='input' name='addedby' onChange={(e) => handleChange(e)} type='text' placeholder='added by' value={userDetails.addedby}/></div>
          </div> */}
          <div className='form-row'>
            <div className='label'><span>*</span> Role :</div>
              <div className='input'> 
                <select className='role-select' name='role' onChange={(e) => handleChange(e)} id='role'>
                  <option className='role-select-option' disabled selected>Select Role</option>
                  <option className='role-select-option'>Admin</option>
                  <option className='role-select-option'>Trainer</option>
                  <option className='role-select-option'>Councelor</option>
                  <option className='role-select-option'>Placement</option>
                  <option className='role-select-option'>Student</option>
                </select>
              </div>
              {userDetailsSchema.role_id ? <label className='not-provided'>* please enter role</label> : null}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='add-user-footer'>
        <Button className='add-user-button add' variant="primary" onClick={handleAddClick}>
          Add
        </Button>
        <Button className='add-user-button close' variant="secondary" onClick={() => setOpenModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUser;
