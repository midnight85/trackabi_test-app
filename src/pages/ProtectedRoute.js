import React from 'react';
import {Navigate} from "react-router-dom";
import {getUserFromLocalStorage} from "../utils/localStorage";

const ProtectedRoute = ({children}) => {
    const isUser = getUserFromLocalStorage()
    if (!isUser?.token) {
        console.log('redirect')
        return <Navigate to="/login"/>
    }
    return children
};

export default ProtectedRoute;