import React, { Dispatch,useEffect,useState } from "react"
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button, OverlayTrigger,Tooltip } from "react-bootstrap";
import { getRoleDescription, ROLE } from '../../../../../common/constants';
import "../scss/edit-delete-user.scss"
import Edit from "./Edit";
import ModalAuthentication from "./ModalAuthentication";
import { MdDelete } from "react-icons/md";
import { deleteUserAPI, updateUserAPI } from "../../api/users.api";
import { useSelector } from "react-redux";
import { IBaseResponse, Iuser } from '../../types/personnel.type';
import { GenericError } from "./Error-Handler";

type IResponse = IBaseResponse<Iuser[]> | IBaseResponse;

interface MainEditDeleteProps {
    showUserData: boolean;
    userData: Iuser | undefined;
    setShowUserData: Dispatch<React.SetStateAction<boolean>>
    getUsers: () => Promise<void>
}

const INITIAL_USER:Iuser = {
  email: "ERROR::could not be fetched",
  phone: null,
  username: "ERROR::could not be fetched",
  firstname: "ERROR::could not be fetched",
  lastname: "ERROR::could not be fetched",
  role_id: 101
}

interface ToggleChanges {
    toggleSaveChanges: boolean,
    toggleRevertChanges: boolean,
    toggleDelete: boolean
}

const MainEditDelete = ({showUserData,setShowUserData,userData = INITIAL_USER,getUsers}: MainEditDeleteProps) => {
    const {user} = useSelector((state: any) => state.auth);
    const [toggleChanges,setToggleChanges] = useState<ToggleChanges>({toggleSaveChanges: false, toggleRevertChanges: false, toggleDelete: false});
    const [changes,setChanges] = useState<Record<string | number, any> | null>(null);
    const [authenticatedPassword,setAuthenticatedPassword] = useState<string>("")
    const [error,setError] = useState<boolean>(false)
    const [errorDetails,setErrorDetails] = useState<string>("")
    
    const roleBadge = (): JSX.Element => {
        const role = userData.role_id !== null ? ROLE[userData.role_id] : "Unknown Role";
        return (
            <OverlayTrigger
                placement="left"
                overlay={<Tooltip>{getRoleDescription(role)}</Tooltip>}
            >
                <div className='role-badge' data-role={role}>{role}</div>
            </OverlayTrigger>
        );
    }

    const updateChanges = (newChanges: Object | null) => {
        if (newChanges && 'phone' in newChanges) {
            // Ensure 'phone' is a number
            const updatedChanges = {
                ...newChanges,
                phone: typeof newChanges['phone'] === 'string' ? Number(newChanges['phone']) : newChanges['phone'],
            };
            setChanges(updatedChanges);
        } else {
            setChanges(newChanges);
        }
    };

    const onConfirm = async() => {
        setError(false);
        setToggleChanges((prev) => ({...prev,toggleSaveChanges: false}))
        
        let finalChanges:Record<string, any> = {auth_email:user.email,auth_password:authenticatedPassword,user_id:userData.user_id};
        finalChanges = { 
            ...finalChanges, 
            ...(changes || {})
        };

        const keys = Object.keys(finalChanges)
        keys.forEach((val) => console.log(typeof(finalChanges[val])));

        const response: IResponse = await updateUserAPI(user.username, user.role_id,finalChanges)

        if (!response.success || response?.status !== 200) {
            setError(true)
            setErrorDetails(response?.message || "Something unexpected happened, please try again later")
            return
        }
        setToggleChanges((prev) => ({...prev,toggleSaveChanges: false}))
        await getUsers()
    }

    const handleConfirmDelete = async() => {
        setError(false);
        setToggleChanges((prev) => ({...prev,toggleDelete: false}))
        
        let finalChanges = {auth_email:user.email,auth_password:authenticatedPassword,user_id:userData.user_id};

        const response: IResponse = await deleteUserAPI(user.username, user.role_id,finalChanges)

        if (!response.success || response?.status !== 200) {
            setError(true)
            setErrorDetails(response?.message || "Something unexpected happened, please try again later")
            return
        }
        setToggleChanges((prev) => ({...prev,toggleSaveChanges: false}))
        await getUsers()
    }

    

    return(
        <Offcanvas show={showUserData} placement="end" style={{width: "500px"}} className="userDetail-drawer">
          <Offcanvas.Header className="d-header border-bottom">
              <div onClick={() => setShowUserData(false)} className='close-icon'>✗</div>
              <Offcanvas.Title className='w-100  d-flex align-items-center justify-content-between' >
                  <div className="d-flex align-items-center gap-2">
                      <div className="default-avatar rounded-circle text-white d-flex align-items-center justify-content-center">
                          {userData.firstname[0]}{userData.lastname[0]}
                      </div>
                      <div className='d-flex flex-column align-items-start' >
                          <div className="flname">{userData.firstname} {userData.lastname}</div>
                          <small className="username">@{userData.username}</small>
                      </div>
                  </div>
                  {roleBadge()}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{marginTop:"0px",paddingTop:"0px"}}>
                <GenericError errorDetails={errorDetails}/>
                <Edit value={userData} changes={changes} setChanges={setChanges}/>
            </Offcanvas.Body>
            <div className="offcanvas-footer">
                <div className="Delete-Option">
                    <Button className="delete-button" onClick={() => setToggleChanges((prev) => ({...prev,toggleDelete: true}))}>Delete <MdDelete /></Button>
                </div>
                <div className={`update-revert ${(changes) ? 'transitioned' : 'initial'}`} style={{display: changes ? "" : "none"}}>
                    <div className="label-update-revert">Do you want to save changes?</div>
                    <div className="button-update-revert">
                        <Button className="save-changes-button" onClick={() => setToggleChanges((prev) => ({...prev,toggleSaveChanges: true}))}>Save Changes</Button>
                        <Button className="revert-changes-button" onClick={() => setToggleChanges((prev) => ({...prev,toggleRevertChanges: false}))}>Revert Changes</Button>
                    </div>
                </div>  
                {<ModalAuthentication toggleChanges={toggleChanges} role_id={userData.role_id} handleConfirmDelete={handleConfirmDelete} onConfirm={onConfirm} setAuthenticatedPassword={setAuthenticatedPassword} setToggleChanges={setToggleChanges}/>}        
            </div>
        </Offcanvas>
    )
}

export default MainEditDelete