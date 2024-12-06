import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    const { token } = useSelector((state: any) => state.auth);

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return token ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;