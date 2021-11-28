import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
// import LockIcon from '@mui/icons-material/Lock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles'
import Gicon from './icon'
import Box from '@material-ui/core/Box';
// import { TextField } from '@material-ui/core';
import Input from './Input'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {AUTH, LOGOUT } from '../../constants/actionTypes';

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();                
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();
    
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }
    const handleSubmit = () => {
        
    }

    const handleChange = () => {
        
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        //console.log(result);

        try {
            dispatch({ type: AUTH, data: { result, token } });
            navigate('/');

        } catch (error) {
            console.log(error)
        }

    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Sign in failed.Try again")
    }
    
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon color="primary" />
                    </Avatar>
                    <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                    </>
                            )}
                            <Input name="email" label="Email" handleChange={handleChange} autoFocus={isSignup ?false: true} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignup &&
                                <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>
                            }
                        </Grid>
                        <Box pt={2}>
                            <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit} >{isSignup ? "Sign Up" : "Sign In"}</Button>
                        </Box>

                        <Box pt={2}>
                            <GoogleLogin
                            clientId="802372011188-c3h6alkbm8dh88imcrhjd733su4q7kvr.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Gicon />}
                                    variant="contained"
                                >Google Sign In</Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        </Box>
                        
                       <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? "Already have an account ? Sign In" : "Don't have an account ? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Auth;
