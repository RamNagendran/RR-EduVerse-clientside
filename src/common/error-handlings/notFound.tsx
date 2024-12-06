import React from "react";
import NotFoundImg from '../../assets/images/SVGs/not_found.svg';
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="d-flex w-100" style={{ height: "100vh" }}>
            <div className="d-flex align-items-center justify-content-between w-100">
                <div className="w-100 d-flex flex-column align-items-center  " >
                    <p style={pageNotFound} >Page Not Found</p>
                    <p style={description}>Oops! The page you're looking for is missing or might have been moved.</p>
                    <button onClick={() => navigate(-1)} type="button" className="btn w-50 mt-5" style={goBack}>
                        Go Back
                    </button>
                </div>
                <img height={700} width={700} src={NotFoundImg} alt="not found img" />
            </div>
        </div>
    )
}

export default NotFound;

const pageNotFound = { color: "#50535F", fontWeight: 700, fontSize: "35px" }
const description = { textAlign: "center" as const, fontWeight: 400, color: "#50535F", fontSize: "20px", width: "543px" }
const goBack = { background: "#002855", color: "#fff", fontWeight: 800, fontSize: "18px" }