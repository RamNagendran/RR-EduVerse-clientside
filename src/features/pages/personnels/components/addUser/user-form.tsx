import React, { Dispatch, SetStateAction } from "react";
import { FieldError, GenericError } from "./error-handler";
import { Button } from "react-bootstrap";
import PasswordsPack from "./handle-passwords";
import { IPASSWORD_INITIALS, Iuser, IUserDetailsSchema } from "../../types/personnel.type";

interface IUserFormProps {
    error: boolean;
    userDetails: Iuser;
    errorDetails: string;
    passwordDetails: IPASSWORD_INITIALS;
    userDetailsSchema: IUserDetailsSchema;
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    setUserDetailsSchema: Dispatch<React.SetStateAction<IUserDetailsSchema>>;
    setPasswordDetails: Dispatch<SetStateAction<IPASSWORD_INITIALS>>;
    setUserDetails: React.Dispatch<React.SetStateAction<Iuser>>;
    toggleGeneratePassword: () => void;
}

const UserForm: React.FC<IUserFormProps> = ({
    error,
    userDetails,
    errorDetails,
    passwordDetails,
    userDetailsSchema,
    toggleGeneratePassword,
    setUserDetailsSchema,
    setPasswordDetails,
    setUserDetails,
    handleChange,
}) => {


    const labelInputSet = (name: string, label: string, value: any): JSX.Element => {
        return (
            <>
                <div className='label'><span>*</span> {label} :</div>
                <div className='input'>
                    <input className='input-box' type='text' name={name} onChange={(e) => handleChange(e)} placeholder={label} value={value} />
                </div>
            </>
        )
    }

    return (
        <form className='add-user-form'>
            {error ? <GenericError errorDetails={errorDetails} /> : null}
            <div className='form-row'>
                {labelInputSet("username", "Username", userDetails.username)}
                {userDetailsSchema.username ? <FieldError message={"Please enter username"} /> : null}
            </div>
            <div className='form-row-name'>
                <div className='name'>
                    {labelInputSet("firstname", "Firstname", userDetails.firstname)}
                    {userDetailsSchema.firstname ? <FieldError message={"Please enter firstname"} /> : null}
                </div>
                <div className='name'>
                    {labelInputSet("lastname", "Lastname", userDetails.lastname)}
                    {userDetailsSchema.lastname ? <FieldError message={"Please enter lastname"} /> : null}
                </div>
            </div>
            <div className='form-row'>
                {labelInputSet("email", "Email", userDetails.email)}
                {userDetailsSchema.email ? <FieldError message={"Please enter email"} /> : null}
            </div>
            <div className='form-row'>
                {labelInputSet("phone", "Phone no", userDetails.phone)}
                {userDetailsSchema.phone ? <FieldError message={"Please enter phone number"} /> : null}
            </div>
            <div className='form-row'>
                <PasswordsPack
                    userDetails={userDetails}
                    passwordDetails={passwordDetails}
                    userDetailsSchema={userDetailsSchema}
                    setUserDetailsSchema={setUserDetailsSchema}
                    setPasswordDetails={setPasswordDetails}
                    setUserDetails={setUserDetails}
                    handleChange={handleChange}
                />
                <Button className='generateButton' onClick={toggleGeneratePassword}>
                    {passwordDetails.isGeneratedToggled ? 'Custom Password' : 'Generate Password'}
                </Button>
            </div>
            <div className='form-row'>
                <div className='label'><span>*</span> Role :</div>
                <div className='input'>
                    <select className='role-select' name='role_id' onChange={(e) => handleChange(e)} id='role_id'>
                        <option className='role-select-option' disabled selected>Select Role</option>
                        <option className='role-select-option' value={101} >Admin</option>
                        <option className='role-select-option' value={102} >Trainer</option>
                        <option className='role-select-option' value={103} >Councelor</option>
                        <option className='role-select-option' value={104} >Placement</option>
                    </select>
                </div>
                {userDetailsSchema.role_id ? <FieldError message={"Please select role"} /> : null}
            </div>
        </form>
    )
};

export default UserForm;