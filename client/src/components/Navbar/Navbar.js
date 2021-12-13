import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { AppBar, Typography, Toolbar, Avatar, Button, Fab } from '@material-ui/core';

import memoriesLogo from '../../images/logo.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';


const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const resources = () => {
    navigate('/resources/files');
  }


  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate('/');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} color="inherit">
      <Link to="/" style={{ textDecoration: 'none' }} className={classes.brandContainer}>
        {/* <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" /> */}
        <Typography className={classes.logo}>BLEND</Typography>
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>

        <div>
          <Button className={classes.fab_button} variant="extended" onClick={resources} elevation = {1}>

            {/* <AddIcon /> */}
            Resources

          </Button>
        </div>


        {user?.result ? (
          <div className={classes.profile}>
            <Link to={`/profile/${user.result.email}`} style={{ textDecoration: 'none', color: "black" }} className={classes.brandContainer}>
              <Avatar className={classes.Circularimg} alt={user?.result.name} src={user?.result.imageData}></Avatar>
              </Link>
              {/* <Typography className={classes.userName} variant="h5">{user?.result.name}</Typography> */}
            <Button variant="contained" className={classes.logout} onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" className={classes.signin}>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

