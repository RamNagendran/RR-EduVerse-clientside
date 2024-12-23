import React, { memo } from 'react';
import { Button, Image, Card, FloatingLabel, Form } from 'react-bootstrap';
import { LoginCardProps } from '../types/auth.types';

// Import images
import SLA from '../../../assets/images/image/sla.jpeg';
import RRPROJX from '../../../assets/images/SVGs/rrprojx.svg';
import EyeOpen from '../../../assets/images/SVGs/eye-open.svg';
import EyeClosed from '../../../assets/images/SVGs/eye-closed.svg';

// Styles object to keep inline styles organized
const styles = {
    input: (hasError: boolean) => ({
        borderRadius: '0px',
        borderColor: hasError ? 'red' : '#dee2e6'
    })
};

/**
 * LoginCard Component
 * Displays the login form with email and password inputs
 * @component
 */
const LoginCard: React.FC<LoginCardProps> = memo(({
    formState,
    errors,
    UI_CONSTANTS,
    handleInputChange,
    togglePasswordVisibility,
    handleLogin,
    ErrorMessage
}) => {
    const hasEmailError = errors.email || errors.commonErrors;
    const hasPasswordError = errors.password || errors.commonErrors;

    return (
        <Card
            className="card col-md-8 col-sm-9 col-xs-12"
            style={{ boxShadow: UI_CONSTANTS.BOX_SHADOW }}
        >
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <Card.Title className="d-flex flex-column align-items-center justify-content-center">
                    <Image src={SLA} fluid className="w-50" />
                </Card.Title>
                <Card.Text className="d-flex flex-column w-100">
                    <span className='welcome-text'>Welcome back!</span>
                    <span className='description-text'>{UI_CONSTANTS.LOGIN_DESC}</span>
                </Card.Text>

                <FloatingLabel controlId="floatingEmailInput" label="Email address" className="w-100 mb-3">
                    <Form.Control
                        required
                        style={styles.input(Boolean(hasEmailError))}
                        onChange={handleInputChange('email')}
                        type="email"
                        placeholder="name@example.com"
                    />
                    {errors.email && <ErrorMessage message={errors.email} />}
                </FloatingLabel>

                <FloatingLabel
                    className="password-container w-100 mb-3"
                    controlId="floatingPasswordInput"
                    label="Password"
                >
                    <Form.Control
                        required
                        style={styles.input(Boolean(hasPasswordError))}
                        onChange={handleInputChange('password')}
                        type={formState.showPassword ? "text" : "password"}
                        placeholder="Password"
                    />
                    <img
                        alt="eye-icon"
                        src={formState.showPassword ? EyeOpen : EyeClosed}
                        onClick={togglePasswordVisibility}
                        className='eye-icon'
                    />
                    {errors.password && <ErrorMessage message={errors.password} />}
                </FloatingLabel>

                {errors.commonErrors && <ErrorMessage message={errors.commonErrors} />}

                <Card.Text className="w-100 mt-5">
                    <Button onClick={handleLogin} className='login-button' >
                        LOGIN
                    </Button>
                </Card.Text>

                <div className="w-100 mt-4 d-flex align-items-center justify-content-end">
                    <span className='powered-by' >Powered by</span>
                    <Image src={RRPROJX} className='logo' alt="RRPROJX logo" />
                </div>
            </Card.Body>
        </Card>
    );
}, (prevProps, nextProps) => {
    // Memoization comparison
    return (
        prevProps.formState.email === nextProps.formState.email &&
        prevProps.formState.password === nextProps.formState.password &&
        prevProps.formState.showPassword === nextProps.formState.showPassword &&
        JSON.stringify(prevProps.errors) === JSON.stringify(nextProps.errors)
    );
});

export default LoginCard;