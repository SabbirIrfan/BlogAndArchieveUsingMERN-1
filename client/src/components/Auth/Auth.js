import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { Avatar, Button, Paper, Grid, Typography, Container, Form } from '@mui/material';
// import LockIcon from '@mui/icons-material/Lock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles'
import Gicon from './icon'
import Box from '@material-ui/core/Box';
// import { TextField } from '@material-ui/core';
import Input from './Input'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../constants/actionTypes';
import {signin, signup} from '../../actions/auth'

// const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' , imageUrl: '' ,imageData: '' ,linkedIn: '' ,github: '' ,social: '' ,institude: '' };

const Auth = ({setUserId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();                
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Hello")
        // console.log(formData)
        if (isSignup) {
            dispatch(signup(formData,navigate, setUserId))
        }
        else {
            dispatch(signin(formData, navigate, setUserId))

        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        console.log(result.imageUrl);
        const formData = { firstName: result.givenName, lastName: result.familyName, email: result.email, password: '', confirmPassword: '', imageUrl: result.imageUrl, imageData: '', linkedIn: '', github: '', social: '', institude: '', googleId: result.googleId };
        // console.log(initialState)
        dispatch(signup(formData,navigate, setUserId))
        //  dispatch(signup({result},navigate, setUserId))
        try {
            dispatch({ type: AUTH, data: { result, token } });
            setUserId("GLogIN")
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
                        <LockOutlinedIcon color="#ff675c" />
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
                            <Input name="password" label="Password" autocomplete="on" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            
                            {isSignup &&
                            <Input name="confirmPassword" autocomplete="on" label="Confirm Password" handleChange={handleChange} type="password" />    
                            }
                        </Grid>
                        <Box pt={2}>
                            <Button type="submit" fullWidth variant="contained" className={classes.submit} style={{backgroundColor: '#9abf7a',color: '#ffffff',hover: {backgroundColor: '#5d6e7a',}}} >{isSignup ? "Sign Up" : "Sign In"}</Button>
                        </Box>
                        {isSignup &&
                                <Box pt={2}>
                                    <form action="http://localhost:5000/auth/google">
                                        <Button style={{ backgroundColor: '#ff675c', color: '#ffffff', hover: { backgroundColor: '#5d6e7a', } }}
                                    className={classes.googleButton}
                                    fullWidth type="submit" startIcon={<Gicon />}
                                            variant="contained" >Sign Up with Google</Button>
                                    </form>
                                </Box> 
                            }
                        {!isSignup &&
                            <Box pt={2}>
                                <GoogleLogin
                                    clientId="802372011188-c3h6alkbm8dh88imcrhjd733su4q7kvr.apps.googleusercontent.com"
                                    render={(renderProps) => (
                                        <Button style={{ backgroundColor: '#ff675c', color: '#ffffff', hover: { backgroundColor: '#5d6e7a', } }}
                                            className={classes.googleButton}
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
                            </Box>}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode} style={{color:"#334155"}}>
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
