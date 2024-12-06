import React, { memo } from 'react';
import { Button, Image, Card, FloatingLabel, Form } from 'react-bootstrap';
import { LoginFormState } from '../types/auth.types';

// Import images
import SLA from '../../../assets/images/image/sla.jpeg';
import RRPROJX from '../../../assets/images/SVGs/rrprojx.svg';
import EyeOpen from '../../../assets/images/SVGs/eye-open.svg';
import EyeClosed from '../../../assets/images/SVGs/eye-closed.svg';

interface LoginCardProps {
    formState: LoginFormState;
    errors: {
        email: string;
        password: string;
        commonErrors: string;
    };
    UI_CONSTANTS: {
        BOX_SHADOW: string;
        LOGIN_DESC: string;
    };
    handleInputChange: (field: keyof LoginFormState) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    togglePasswordVisibility: () => void;
    handleLogin: () => Promise<void>;
    ErrorMessage: React.FC<{ message: string }>;
}

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
    return (
        <Card className="col-md-8 col-sm-9 col-xs-12" style={{ padding: "10px", borderRadius: "0px", boxShadow: UI_CONSTANTS.BOX_SHADOW }}>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <Card.Title className="d-flex flex-column align-items-center justify-content-center">
                    <Image src={SLA} fluid className="w-50" />
                </Card.Title>
                <Card.Text className="d-flex flex-column w-100">
                    <span style={{ fontSize: "18px", fontWeight: 600 }} >Welcome back!</span>
                    <span style={{ fontSize: "14px", color: "#6c6c6c", fontWeight: 400 }}>{UI_CONSTANTS.LOGIN_DESC}</span>
                </Card.Text>
                <FloatingLabel controlId="floatingEmailInput" label="Email address" className="w-100 mb-3">
                    <Form.Control
                        required
                        style={{ borderRadius: '0px', borderColor: (errors.email || errors.commonErrors) ? 'red' : '#dee2e6' }}
                        onChange={handleInputChange('email')}
                        type="email"
                        placeholder="name@example.com"
                    />
                    {errors.email && <ErrorMessage message={errors.email} />}
                </FloatingLabel>
                <FloatingLabel
                    className="w-100 mb-3"
                    controlId="floatingPasswordInput"
                    label="Password"
                    style={{ position: "relative", height: "40px" }}
                >
                    <Form.Control
                        required
                        style={{ borderRadius: '0px', borderColor: (errors.password || errors.commonErrors) ? 'red' : '#dee2e6' }}
                        onChange={handleInputChange('password')}
                        type={formState.showPassword ? "text" : "password"}
                        placeholder="Password"
                    />
                    <img
                        alt="eye-icon"
                        src={formState.showPassword ? EyeOpen : EyeClosed}
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer", position: "absolute", top: 22, right: 22 }}
                    />
                    {errors.password && <ErrorMessage message={errors.password} />}
                </FloatingLabel>
                {errors.commonErrors && <ErrorMessage message={errors.commonErrors} />}
                <Card.Text className="w-100 mt-5">
                    <Button
                        onClick={handleLogin}
                        style={{
                            borderRadius: "0px",
                            border: "none",
                            height: "50px",
                            width: "100%",
                            backgroundColor: "#313949",
                            color: "white",
                            fontWeight: 700
                        }}
                    >
                        LOGIN
                    </Button>
                </Card.Text>
                <div className="w-100 mt-4 d-flex align-items-center justify-content-end">
                    <span style={{ fontSize: "10px", marginRight: "5px", color: "#a6a6a6" }}>Powered by</span>
                    <Image src={RRPROJX} style={{ height: "12px" }} alt="RRPROJX logo" />
                </div>
            </Card.Body>
        </Card>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.formState.email === nextProps.formState.email &&
        prevProps.formState.password === nextProps.formState.password &&
        prevProps.formState.showPassword === nextProps.formState.showPassword &&
        JSON.stringify(prevProps.errors) === JSON.stringify(nextProps.errors)
    )
});

export default LoginCard;