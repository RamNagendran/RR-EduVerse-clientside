import React, { Dispatch, useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import EyeOpen from '../../../../../assets/images/SVGs/eye-open.svg';
import EyeClosed from '../../../../../assets/images/SVGs/eye-closed.svg';

interface ChangePasswordProps {
    username: string;
    setChangePasswordButton: Dispatch<React.SetStateAction<boolean>>;
    setChanges: Dispatch<React.SetStateAction<Object>>;
}

interface PasswordObject {
    newPassword: string;
    confirmPassword: string;
    generatedPassword: string;
}

interface PasswordError {
    newPassword: boolean;
    confirmPassword: boolean;
    isSame: boolean;
    notUsername: boolean;
    usernameShort: boolean;
}

const ChangePassword = ({ username, setChangePasswordButton, setChanges }: ChangePasswordProps) => {
    const [newPassword, setPassword] = useState<PasswordObject>({ newPassword: "", confirmPassword: "", generatedPassword: "" });
    const [passwordError, setPasswordError] = useState<PasswordError>({ newPassword: false, confirmPassword: false, isSame: false, notUsername: false, usernameShort: false });
    const [passVisibilities, setPassVisibilities] = useState({ password: false, confPassword: false });
    const [toggleGeneratePassword, setToggleGeneratePassword] = useState<boolean>(false);

    const toggleShowPassVisibility = (type: "password" | "confPassword") => {
        setPassVisibilities((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const handleClick = () => {
        if (!newPassword.generatedPassword) {
            const updatedErrors = {
                newPassword: !newPassword.newPassword,
                confirmPassword: !newPassword.confirmPassword,
                isSame: newPassword.newPassword !== newPassword.confirmPassword,
            };

            setPasswordError((prev) => ({ ...prev, ...updatedErrors }));

            if (!updatedErrors.newPassword && !updatedErrors.confirmPassword && !updatedErrors.isSame) {
                setChanges((prev) => ({ ...prev, password: newPassword.newPassword }));
                setChangePasswordButton(false);
            }
        } else {
            setChanges((prev) => ({ ...prev, password: newPassword.generatedPassword }));
        }
    };

    const generateSecurePassword = useCallback(() => {
        const charsets = {
            upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            numbers: "0123456789",
            special: "@#$%&",
        };

        const usernamePrefix = username.substring(0, 2);
        const specialCharacter = charsets.special[Math.floor(Math.random() * charsets.special.length)];
        const uppercaseLetter = charsets.upper[Math.floor(Math.random() * charsets.upper.length)];
        const numbers = Array.from({ length: 4 }, () => charsets.numbers[Math.floor(Math.random() * charsets.numbers.length)]).join("");

        return `${usernamePrefix}${specialCharacter}${uppercaseLetter}${numbers}`;
    }, [username]);

    const handleTogglePassword = () => {
        if(username.length < 1){
            return setPasswordError((prev) => ({ ...prev, usernameShort: true }));
        }
        if (!username) {
            setPasswordError((prev) => ({ ...prev, notUsername: true }));
        } else {
            setPasswordError((prev) => ({ ...prev, notUsername: false,usernameShort: false }));
            setToggleGeneratePassword((prev) => !prev);
        }

        if (!toggleGeneratePassword) {
            setPassword((prev) => ({ ...prev, generatedPassword: generateSecurePassword() }));
        }
    };

    return (
        <div className="div-change-password">
            <div className="box" style={{ margin: "0px" }}>
                <div className="edit-label-div" style={{ width: "40%" }}>
                    {toggleGeneratePassword ? "Generated Password" : "New Password"}
                </div>
                <div className="edit-input-div-password">
                    <div className="input-password-edit-box">
                        <input
                            className="input-edit-password"
                            type={passVisibilities.password ? "text" : "password"}
                            name="password"
                            value={toggleGeneratePassword ? newPassword.generatedPassword : newPassword.newPassword}
                            onChange={(e) => setPassword((prev) => ({ ...prev, newPassword: e.target.value }))}
                            placeholder="New Password"
                        />
                        <img
                            alt="eye-icon"
                            src={passVisibilities.password ? EyeOpen : EyeClosed}
                            onClick={() => toggleShowPassVisibility("password")}
                            className="eye-icon"
                        />
                    </div>
                    <label className="not-provided">
                        {passwordError.newPassword && "* new password not provided"}
                    </label>
                </div>
            </div>

            {!toggleGeneratePassword && (
                <div className="box" style={{ marginTop: "10px" }}>
                    <div className="edit-label-div" style={{ width: "40%" }}>Confirm Password</div>
                    <div className="edit-input-div-password">
                        <div className="input-password-edit-box">
                            <input
                                className="input-edit-password"
                                type={passVisibilities.confPassword ? "text" : "password"}
                                name="confirmpassword"
                                value={newPassword.confirmPassword}
                                onChange={(e) => setPassword((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                                placeholder="Confirm Password"
                            />
                            <img
                                alt="eye-icon"
                                src={passVisibilities.confPassword ? EyeOpen : EyeClosed}
                                onClick={() => toggleShowPassVisibility("confPassword")}
                                className="eye-icon"
                            />
                        </div>
                        <label className="not-provided">
                            {passwordError.confirmPassword && "* confirm password not provided"}
                            {passwordError.isSame && "* new password and confirm password not same"}
                            {passwordError.notUsername && "* username needed to generate password"}
                            {passwordError.usernameShort && "* username must contain more than 2 character"}
                        </label>
                    </div>
                </div>
            )}

            <div className="box-password">
                <Button className="generate-password-button" onClick={handleTogglePassword}>
                    {toggleGeneratePassword ? "Custom Password" : "Generate Password"}
                </Button>
            </div>
            <div className="password-save-button">
                <Button className="savepassword-changes-button" onClick={handleClick}>Save password</Button>
                <Button className="dontsavepassword-changes-button" onClick={() => setChangePasswordButton(false)}>Don't save the password</Button>
            </div>
        </div>
    );
};

export default ChangePassword;