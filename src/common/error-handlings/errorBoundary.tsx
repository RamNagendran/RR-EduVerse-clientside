import React, { Component, ErrorInfo, ReactNode } from "react";
import SomethingWent_wrong from '../../assets/images/SVGs/something_wrong.png';
import { useNavigate } from "react-router-dom";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}



const Fallback : React.FC = () => {

    const navigate = useNavigate()

    return (
        <div className="d-flex align-items-center" style={{ padding: "10px", height: "100vh" }} >
            <div style={{height: "100%", width: "50%" }} className="d-flex  justify-content-center flex-column" >
                <div style={{ fontSize: "85px", fontWeight: 800 }} >OOPS!!</div>
                <div style={{ fontSize: "23px", color: "#808080", fontWeight: 500 }} >
                    <div>It seems that something went wrong, We're working on fixing it.
                        <br />Feel free to go back and try again later.
                        <br />Thanks for your patience!
                    </div>
                </div>
                <button onClick={() => navigate(-1)} type="button" className="btn btn-info w-50 mt-5" style={goBack}>
                    Go Back
                </button>
            </div>
            <img  style={image} src={SomethingWent_wrong} alt="Something went wrong" />
        </div>
    )
}

export { ErrorBoundary, Fallback };

const goBack = { color: "#fff", fontWeight: 800, fontSize: "18px" }
const image = { marginTop: "0px", height: "70%", width: "50%" }


