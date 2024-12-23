import React, { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import TxtTypingAnime from "./text-typing-anime";

// Import scss css file...
import './scss/login.scss';

// Import api relateds...
import { IErrorResponse, ILoginCredentials, ILoginResponse, LoginFormState } from "../types/auth.types";
import { loginApi } from "../api/auth.api";

// Import images...
import Login from '../../../assets/images/image/login.png';
import LoginBck3 from '../../../assets/images/image/login-bck3.jpg';
import { validateEmail, validatePassword } from "../../../common/utils/password-validate";
import LoginCard from "./login-card";
import { setAuth } from "../../../stateManager/reducer/auth.slice";

// Constants
const UI_CONSTANTS = {
    BOX_SHADOW: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
    SHINE_TEXT: 'AITrainHub: Integrated AI solutions for trainers and learners.',
    LOGIN_DESC: 'Login with your email id and password.',
    ERROR_MESSAGES: {
        EMAIL_REQUIRED: 'Email id is required',
        EMAIL_INVALID: 'Enter a valid email id',
        PASSWORD_REQUIRED: 'Password is required',
        PASSWORD_INVALID: 'Enter a valid password'
    }
} as const;


/**
 * LoginPage Component
 * Handles user authentication with email and password
 * @component
 */
const LoginPage: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Form state
    const [formState, setFormState] = useState<LoginFormState>({
        email: '',
        password: '',
        showPassword: false
    });
    // Error state
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        commonErrors: ''
    });


    /**
    * Handles input changes for form fields
    * @param {keyof LoginFormState} field - The field being updated (email or password)
    * @returns {(e: React.ChangeEvent<HTMLInputElement>) => void} Event handler function
    */
    const handleInputChange = useCallback((field: keyof LoginFormState) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormState(prev => ({ ...prev, [field]: e.target.value }));
        setErrors(prev => ({ ...prev, [field]: '', commonErrors: '' }));
    }, []);



    const togglePasswordVisibility = useCallback(() => {
        setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }));
    }, []);


    /**
     * Handles the login form submission
     * Validates form, makes API call, and handles response
    */
    const handleLogin = useCallback(async () => {

        // validate form before further process...
        const validateForm = () => {
            let isValid = true;
            const newErrors = { email: '', password: '', commonErrors: '' };

            // Email validation
            if (!formState.email) {
                newErrors.email = UI_CONSTANTS.ERROR_MESSAGES.EMAIL_REQUIRED;
                isValid = false;
            } else if (!validateEmail(formState.email)) {
                newErrors.email = UI_CONSTANTS.ERROR_MESSAGES.EMAIL_INVALID;
                isValid = false;
            }

            // Password validation
            if (!formState.password) {
                newErrors.password = UI_CONSTANTS.ERROR_MESSAGES.PASSWORD_REQUIRED;
                isValid = false;
            } else if (!validatePassword(formState.password)) {
                newErrors.password = UI_CONSTANTS.ERROR_MESSAGES.PASSWORD_INVALID;
                isValid = false;
            }

            setErrors(newErrors);
            return isValid;
        };

        // if the validation fails, the function ends here...
        if (!validateForm()) return;

        let loginCredentials: ILoginCredentials = {
            email: formState.email.trim(),
            password: formState.password
        }

        // authentication api function...
        const res: ILoginResponse | IErrorResponse = await loginApi(loginCredentials)

        // if the response has error key, then the function ends here...
        if ('error' in res) {
            setErrors({ email: '', password: '', commonErrors: res.error })
            return
        }

        // if the response has token key, then the function ends here...
        if ('token' in res) {
            setErrors({ email: '', password: '', commonErrors: '' })
            dispatch(setAuth({
                token: res.token,
                user: res.userDetails,
                login_at: res.login_at
            }))
            localStorage.setItem('authToken', res.token)
            navigate('/home/dashboard');
            return
        }
    }, [formState]);

    /**
     * Error message component for displaying validation errors
     * @param {Object} props - Component props
     * @param {string} props.message - Error message to display
     */
    const ErrorMessage: React.FC<{ message: string }> = ({ message }):JSX.Element => (
        <div className={`error-message ${errors.commonErrors ? 'mt-2' : ''}`}
            style={{ textAlign: "start", fontSize: "12px", fontWeight: 700, color: "red" }}
        >
            {message}
        </div>
    );

    return (
        <div className="login">
            <div className="left-part">
                <p className="logo-shine">{UI_CONSTANTS.SHINE_TEXT}</p>
                <img alt="login-img" src={Login} style={{ height: "70%", width: "70%" }} />
                <TxtTypingAnime />
            </div>
            <div className="right-part" style={{ backgroundImage: `url(${LoginBck3}`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} >
                <LoginCard
                    formState={formState}
                    errors={errors}
                    UI_CONSTANTS={UI_CONSTANTS}
                    handleInputChange={handleInputChange}
                    togglePasswordVisibility={togglePasswordVisibility}
                    handleLogin={handleLogin}
                    ErrorMessage={ErrorMessage}
                />
            </div>
        </div>
    )
}

export default LoginPage;