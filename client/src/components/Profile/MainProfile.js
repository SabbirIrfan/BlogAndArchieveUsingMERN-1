import React, { useState, useEffect } from 'react';
import { Card,CardActionArea,CardContent ,CardMedia, Typography, Toolbar, Avatar, Button, Paper} from '@material-ui/core';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import useStyles from './styles';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const MainProfile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // const dispatch = useDispatch();
    // const location = useLocation();
    // const navigate = useNavigate();
    const classes = useStyles();
    console.log(user?.result?.imageUrl)
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
                    <Typography variant="h5">{user?.result?.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">Institude</Typography>
            </Card>
        </div>
    )
}

export default MainProfile;



