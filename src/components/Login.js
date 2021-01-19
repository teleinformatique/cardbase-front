import React, { useState } from 'react';
import { SERVER_URL } from '../constants';
import { Button, TextField } from '@material-ui/core';
import CarList from '../components/CarList';
import {ToastContainer, toast} from 'react-toastify';

const Login = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const [isAuthenticated, setAuthenticated] = useState(false);

    const handleChange = (eve) => {
        setUser({ ...user, [eve.target.name]: eve.target.value });
    };

    const logout = () =>{
        sessionStorage.removeItem('jwt')
        setAuthenticated(false)
    }

    const login = () => {
        fetch(SERVER_URL + 'login', {
            method: 'POST',
            body: JSON.stringify(user),
        })
            .then((response) => {
                const jwtToken = response.headers.get('authorizationbearer');

                if (jwtToken !== null) {
                    sessionStorage.setItem('jwt', jwtToken);
                    setAuthenticated(true);
                }else{
                    toast.warn('Check your username and password',{position: toast.POSITION.BOTTOM_LEFT})
                }
            })
            .catch((error) => console.log(error));
    };
    if (isAuthenticated === true) {
        return <CarList logout={logout}/>;
    } else {
        return (
            <div>
                <TextField
                    label="Username"
                    name="username"
                    onChange={handleChange}
                />
                <br/>
                <TextField
                    label="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                />
                <br/>
                <Button variant="outlined" color="primary" onClick={login}>
                    Login
                </Button>
                <ToastContainer autoClose={2000}/>
            </div>

            
        );
    }
};

export default Login;
