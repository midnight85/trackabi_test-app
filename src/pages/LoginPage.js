import React, {useState, useEffect} from 'react';
import {useAppContext} from "../context/app_context";
import {AuthForm, Loading} from "../components";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setAuthData(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const {state} = useAppContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!!state.user.token) {
            navigate('/')
        }
    }, [state.isLoading])

    if (state.isLoading) {
        return <Loading/>
    }
    return <AuthForm authData={authData} title={'Login page'} handleChange={handleChange}/>;
};


export default LoginPage;