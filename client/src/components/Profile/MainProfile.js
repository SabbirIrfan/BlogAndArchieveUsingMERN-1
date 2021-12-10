import React, { useState, useEffect } from 'react';
import { Card,CardActionArea,CardContent ,CardMedia, Typography, Toolbar, Avatar, Button, Paper} from '@material-ui/core';
// import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import useStyles from './styles';
import { styled } from '@mui/material/styles';
// import { getUserById } from '../../actions/profile';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserById } from '../../actions/profile';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

const Input = styled('input')({
  display: 'none',
});

const MainProfile = ( ) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [userData, setUserData] = useState(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    let linked = "#";
    let github = "#";
    let social = "#";
    let institude = "temp";
    // const location = useLocation();
    // const navigate = useNavigate();
    // getUserById(id);
    const classes = useStyles();

    const setUserProfileData = (data) => {
        // console.log("Hi in the function")
        // console.log(data)
        setUserData(data);
        
        linked = userData.linkedIn;
        github = userData.github;
        social = userData.social;
        institude = userData.institude;
    }
    useEffect(() => {
        dispatch(getUserById(id, setUserProfileData));
        
        // console.log(userData)
    }, [id]);
    console.log(userData)
    // console.log(userData)
    return (
        <div>
            <Card className={classes.card} raised elevation={6}>                
                <div className={classes.centerI}>
                    <Avatar className={classes.sizeAvatar} alt="User Image" src={user?.result?.imageUrl}>
                    </Avatar>
                    <Stack elevation={6} direction="row" alignItems="center" spacing={2}>
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </Stack>
                    <div className={classes.overlay}>
                        <Typography variant="h6">{user.name}</Typography>
                    </div>
                    
                </div>
                <div className={classes.details}>
                    <Typography style={{padding: '0px 2px'}} variant="h5">{user?.result?.name}</Typography>
                    <div style={{ display: 'inline-block' }}>
                        <a href={linked}> <LinkedInIcon></LinkedInIcon></a>
                        <a href={github}> <GitHubIcon></GitHubIcon></a>
                        <a href={social}> <FacebookIcon></FacebookIcon></a>
                    </div>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{institude}</Typography>
            </Card>
        </div>
    )
}

export default MainProfile;
