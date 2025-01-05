import React, { useState, Dispatch, SetStateAction, useEffect, useCallback } from 'react'
import EyeOpen from '../../../../../assets/images/SVGs/eye-open.svg';
import EyeClosed from '../../../../../assets/images/SVGs/eye-closed.svg';
import { IPASSWORD_INITIALS, Iuser, IUserDetailsSchema } from '../../types/personnel.type';

interface IPassPackProps {
    setUserDetails: React.Dispatch<React.SetStateAction<Iuser>>
    setUserDetailsSchema: Dispatch<React.SetStateAction<IUserDetailsSchema>>
    setPasswordDetails: Dispatch<SetStateAction<IPASSWORD_INITIALS>>
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
    userDetailsSchema: IUserDetailsSchema;
    passwordDetails: IPASSWORD_INITIALS;
    userDetails: Iuser;
}

const PasswordsPack: React.FC<IPassPackProps> = ({
    handleChange,
    setUserDetailsSchema,
    setPasswordDetails,
    userDetailsSchema,
    passwordDetails,
    userDetails,
    setUserDetails
}) => {
    const [passVisibilities, setPassVisibilities] = useState({
        password: false,
        confPassword: false
    })

    const toggleShowPassVisibility = () => setPassVisibilities((prev) => ({ ...prev, password: !prev.password }))
    const toggleShowConfPassVisibility = () => setPassVisibilities((prev) => ({ ...prev, confPassword: !prev.confPassword }))

    const handleConfrimPassChange = (e: (React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)) => {
        setUserDetailsSchema((prev: any) => ({ ...prev, confPassword: false }))
        setPasswordDetails((prev: any) => ({ ...prev, confPassword: e.target.value }))
    }

    const customPass = () => {
        return (
            <div className='form-row-password'>
                <div className='password'>
                    <div className='label'><span>*</span> Password :</div>
                    <div className='input'>
                        <input className='input-box' name='password' onChange={(e) => handleChange(e)} type={passVisibilities.password ? 'text' : 'password'} placeholder='password' value={userDetails.password} />
                        <img
                            alt="eye-icon"
                            src={passVisibilities.password ? EyeOpen : EyeClosed}
                            onClick={toggleShowPassVisibility}
                            className='eye-icon'
                        />
                    </div>
                    {userDetailsSchema.password ? <label className='not-provided'>* please enter password</label> : null}
                    {passwordDetails.isPasswordSame ? null : <label className='not-provided'>* password and confirm password does not match</label>}
                    {passwordDetails.isUsernameShort ? <label className='not-provided'>* username must contain more than 2 character</label> : null}
                    {userDetailsSchema.passwordRequirement ? <label className='not-provided'>* username needed to generate password</label> : null}
                </div>
                <div className='password'>
                    <div className='label'><span>*</span> Confirm Password :</div>
                    <div className='input'>
                        <input className='input-box' name='password' onChange={(e) => handleConfrimPassChange(e)} type={passVisibilities.confPassword ? 'text' : 'password'} placeholder='confirm password' value={passwordDetails.confPassword} />
                        <img
                            alt="eye-icon"
                            src={passVisibilities.confPassword ? EyeOpen : EyeClosed}
                            onClick={toggleShowConfPassVisibility}
                            className='eye-icon'
                        />
                    </div>
                    {userDetailsSchema.confPassword ? <label className='not-provided'>* please enter confirm password</label> : null}
                </div>
            </div>
        )
    }

    const generateSecurePassword = useCallback(() => {
            if(!userDetails.username){
                setPasswordDetails(prev => ({ ...prev, isGeneratedToggled: false }));
                setUserDetailsSchema((prev: any) => ({ ...prev, passwordRequirement: true }))
            }else{
                setUserDetailsSchema((prev: any) => ({ ...prev, passwordRequirement: false }))
            }

            const charsets = {
                upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                numbers: "0123456789",
                special: "@#$%&",
            };
                
            const usernamePrefix = userDetails.username.substring(0, 2);
            const specialCharacter = charsets.special[Math.floor(Math.random() * charsets.special.length)];
            const uppercaseLetter = charsets.upper[Math.floor(Math.random() * charsets.upper.length)];
            const numbers = Array.from({ length: 4 }, () =>
                charsets.numbers[Math.floor(Math.random() * charsets.numbers.length)]
            ).join("");
    
            return `${usernamePrefix}${specialCharacter}${uppercaseLetter}${numbers}`;
        }, [userDetails.username]);

    const handlePasswordGeneration = useCallback(() => {

        if (passwordDetails.isGeneratedToggled) {
            setPassVisibilities({ password: false, confPassword: false });

            // Generate secure password
            const generatedPassword = generateSecurePassword();

            // Update user details and password details
            setUserDetails(prev => ({ ...prev, password: generatedPassword }));
            setPasswordDetails(prev => ({ ...prev, confPassword: generatedPassword }));
        } else {
            setPassVisibilities({ password: false, confPassword: false });
            setUserDetails(prev => ({ ...prev, password: "" }));
            setPasswordDetails(prev => ({ ...prev, confPassword: "" }));
        }

    }, [passwordDetails.isGeneratedToggled, generateSecurePassword, setPasswordDetails, setUserDetails]);



    useEffect(() => {
        handlePasswordGeneration();
    }, [handlePasswordGeneration]);


    const generatePass = () => {
        return (
            <div className='form-row-generatePassword'>
                <div className='password'>
                    <div className='label'><span>*</span> Password :</div>
                    <div className='input'>
                        <input className='input-box' name='password' onChange={(e) => handleChange(e)} type={passVisibilities.password ? 'text' : 'password'} placeholder='password' value={userDetails.password} disabled />
                        <img
                            alt="eye-icon"
                            src={passVisibilities.password ? EyeOpen : EyeClosed}
                            onClick={toggleShowPassVisibility}
                            className='eye-icon'
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {passwordDetails.isGeneratedToggled ? generatePass() : customPass()}
        </div>
    )
}

export default PasswordsPack;