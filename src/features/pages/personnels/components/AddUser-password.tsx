import React,{useState,Dispatch,SetStateAction, useEffect} from 'react'
import EyeOpen from '../../../../assets/images/SVGs/eye-open.svg';
import EyeClosed from '../../../../assets/images/SVGs/eye-closed.svg';
import { IUserDetails,IUserDetailsSchema } from './types/adduser.types';

interface AddUserPasswordProps {
    userDetailsSchemaPassword: boolean
    userDetailsSchemaConfPassword: boolean
    userDetailsPassword: string
    isPasswordSame: boolean
    confPassChange: string
    isGeneratedToggled: boolean
    setUserDetails: React.Dispatch<React.SetStateAction<IUserDetails>>
    setUserDetailSchema: Dispatch<React.SetStateAction<IUserDetailsSchema>>
    setConfPassChange: Dispatch<SetStateAction<string>>
    handleChange: (e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => void
}

const AddUserPassword:React.FC<AddUserPasswordProps> = ({
    userDetailsSchemaPassword,
    userDetailsSchemaConfPassword,
    userDetailsPassword,
    isPasswordSame,
    confPassChange,
    isGeneratedToggled,
    setUserDetails,
    setUserDetailSchema,
    setConfPassChange,
    handleChange,
}) => {
    const [showPass,setShowPass] = useState<boolean>(false)
    const [showConfPass,setShowConfPass] = useState<boolean>(false)

    const toggleShowPassVisibility = () => {setShowPass((prev) => prev ? false : true)}
    const toggleShowConfPassVisibility = () => {setShowConfPass((prev) => prev ? false : true)}

    const handleConfrimPassChange = (e:(React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>)) => {
        setUserDetailSchema((prev) => ({...prev,confPassword:false}))
        setConfPassChange((prev) => prev = e.target.value)
    }

    const customPass = () => {
        return (
            <div className='form-row-password'>
                <div className='password'>
                    <div className='label'><span>*</span> Password :</div>
                    <div className='input'>
                    <input className='input-box' name='password' onChange={(e) => handleChange(e)} type={showPass ? 'text' : 'password'} placeholder='password' value={userDetailsPassword}/>
                    <img
                        alt="eye-icon"
                        src={showPass ? EyeOpen : EyeClosed}
                        onClick={toggleShowPassVisibility}
                        className='eye-icon'
                    />
                    </div>
                    {userDetailsSchemaPassword ? <label className='not-provided'>* please enter password</label> : null}
                    {isPasswordSame ? null : <label className='not-provided'>* password and confirm password does not match</label>}
                </div>
                <div className='password'>
                    <div className='label'><span>*</span> Confirm Password :</div>
                    <div className='input'>
                    <input className='input-box' name='password' onChange={(e) => handleConfrimPassChange(e)} type={showConfPass ? 'text' : 'password'} placeholder='password' value={confPassChange}/>
                    <img
                        alt="eye-icon"
                        src={showConfPass ? EyeOpen : EyeClosed}
                        onClick={toggleShowConfPassVisibility}
                        className='eye-icon'
                    />
                    </div>
                    {userDetailsSchemaConfPassword ? <label className='not-provided'>* please enter confirm password</label> : null}
                </div>
            </div>
        )
    }

    useEffect(() => {
        if(isGeneratedToggled){
            setShowPass(false)
            const generatePassword = () => {
                const length = 10;
                const lowerCharset = "abcdefghijklmnopqrstuvwxyz";
                const upperCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                const numberCharset = "0123456789";
                const specialCharset = "!@#$%^&*()-_=+[]{}|;:',.<>?";
                const allCharset = lowerCharset + upperCharset + numberCharset + specialCharset;

                let password = "";
                password += upperCharset[Math.floor(Math.random() * upperCharset.length)];
                password += specialCharset[Math.floor(Math.random() * specialCharset.length)];
                password += lowerCharset[Math.floor(Math.random() * lowerCharset.length)]; 
                password += numberCharset[Math.floor(Math.random() * numberCharset.length)]; 

                for (let i = 4; i < length; i++) {
                    password += allCharset[Math.floor(Math.random() * allCharset.length)];
                }

                password = password.split("").sort(() => 0.5 - Math.random()).join("");
                setUserDetails((prev) => ({...prev,password:password}))
                setConfPassChange(password)
            };

            generatePassword();
        }else{
            setShowPass(false)
            setShowConfPass(false)
            setUserDetails((prev) => ({...prev,password:""}))
            setConfPassChange("")
            setUserDetailSchema((prev) => ({...prev,password:true,confPassword:true}))
        }
    },[isGeneratedToggled])

    useEffect(() => {
        setUserDetailSchema((prev) => ({...prev,password:false,confPassword:false}))
    },[])

    const generatePass = () => {
        return (
            <div className='form-row-generatePassword'>
                <div className='password'>
                    <div className='label'><span>*</span> Password :</div>
                    <div className='input'>
                    <input className='input-box' name='password' onChange={(e) => handleChange(e)} type={showPass ? 'text' : 'password'} placeholder='password' value={userDetailsPassword} disabled/>
                    <img
                        alt="eye-icon"
                        src={showPass ? EyeOpen : EyeClosed}
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
            {isGeneratedToggled? generatePass() : customPass()}
        </div>
    )
}

export default AddUserPassword