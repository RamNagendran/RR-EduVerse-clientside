import React, { useState,Dispatch, useEffect, useCallback } from "react";
import Status_Toggle from "./Status_Toggle";
import "../scss/edit-delete-user.scss";
import ChangePassword from "./ChangePassword";
import { Iuser } from "../../types/personnel.type";

interface EditProps {
    value: Iuser;
    changes: Object | null;
    setChanges: Dispatch<React.SetStateAction<Object>>;
}

interface EditSchema {
    [key: string]: {
        noValue: boolean;
        Edited: boolean;
    };
}

const ROLE: { [key: number]: string } = {
    101: 'Admin',
    102: 'Trainer',
    103: 'Counselor',
    104: 'Placement',
    105: 'Student',
};

const Edit = ({ value, setChanges }: EditProps) => {
    const [status, setStatus] = useState<boolean>(value.status === "active");
    const [changePasswordButton, setChangePasswordButton] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<Iuser>(value);
    const [editSchema, setEditSchema] = useState<EditSchema>({
        firstname: { noValue: false, Edited: false },
        lastname: { noValue: false, Edited: false },
        username: { noValue: false, Edited: false },
        email: { noValue: false, Edited: false },
        phone: { noValue: false, Edited: false }
    });

    useEffect(() => {
        setStatus(value.status === "active");
    }, [value.status]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        if (name === "phone") {
            const phoneno = value.trim() === "" ? null : Number(value);
            setInputValue((prev) => ({ ...prev, [name]: phoneno }));
            setChanges((prev) => ({ ...prev, [name]: phoneno }));
        } else if (name === "role_id") {
            const roleId = Number(value);
            setInputValue((prev) => ({ ...prev, [name]: roleId }));
            setChanges((prev) => ({ ...prev, [name]: roleId }));
        } else {
            setInputValue((prev) => ({ ...prev, [name]: value }));
            setChanges((prev) => ({ ...prev, [name]: value }));
        }
    
        setEditSchema((prev) => ({
            ...prev,
            [name]: {
                Edited: value.trim() !== "",
                noValue: value.trim() === "",
            },
        }));
    };
    
    

    const getInputStyle = (name: keyof EditSchema) => ({
        padding: editSchema[name].Edited ? '5px' : '',
        backgroundColor: editSchema[name].Edited ? '#dee2e6' : '',
        borderRadius: editSchema[name].Edited ? '10px' : ''
    });

    const renderInputField = (
        label: string, 
        name: keyof Iuser, 
        type: string = 'text', 
        placeholder: string
    ) => (
        <div className="box">
            <div className="edit-label-div">{label}</div>
            <div className="edit-input-container-div">
                <input
                    className="input-edit"
                    name={name}
                    style={getInputStyle(name)}
                    value={inputValue[name] || ""}
                    onChange={handleInputChange}
                    type={type}
                    placeholder={placeholder}
                />
                <label className="not-provided">
                    {editSchema[name].noValue && `* ${label.toLowerCase()} not provided`}
                </label>
            </div>
        </div>
    );

    return (
        <form className="div-Edit">
            <div className="box">
                <div className="edit-label-div">Status</div>
                <div className="input-edit-status">
                    <Status_Toggle status={status} setStatus={setStatus} setChanges={setChanges} />
                    <div style={{ color: !status ? "black" : "#ced4da" }} className="edit-status-value">
                        {!status ? "(Active)" : "(Inactive)"}
                    </div>
                </div>
            </div>

            <div className="box">
                <div className="edit-label-div">Role</div>
                <div className="edit-input-container-div">
                    <select
                        className="role-drop-down"
                        value={inputValue.role_id ?? 101}
                        onChange={handleInputChange}
                        name="role_id"
                    >
                        {Object.entries(ROLE).map(([roleId, roleName]) => (
                            <option key={roleId} value={roleId} disabled={Number(roleId) === inputValue.role_id}>
                                {roleName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {renderInputField("Firstname", "firstname", "text", "Firstname")}
            {renderInputField("Lastname", "lastname", "text", "Lastname")}
            {renderInputField("Username", "username", "text", "Username")}
            {renderInputField("Email", "email", "text", "Email (eg: abc@xyz.pqr)")}
            {renderInputField("Phone no", "phone", "number", "Phone number")}

            <div className={`div-button-change-password ${changePasswordButton ? "hide" : ""}`}>
                <div className="edit-label-password-div">Do you want to change password?</div>
                <label className="button-change-password" onClick={() => setChangePasswordButton(true)}>Change Password</label>
            </div>

            <div className={`change-password ${changePasswordButton ? "show" : ""}`}>
                {changePasswordButton ? <ChangePassword username={inputValue.username} setChanges={setChanges} setChangePasswordButton={setChangePasswordButton} /> : null}
            </div>
        </form>
    );
};

export default Edit;