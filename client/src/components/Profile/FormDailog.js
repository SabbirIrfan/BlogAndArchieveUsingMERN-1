import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Divider from "@material-ui/core/Divider";


import { TextField, Button, Typography} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
// import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../../actions/auth';
import useStyles from './formStyle';

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const initalUserData = {
        _id: '',
        name: '',
        email: '',
        password: '',
        profileImg: '',
        googleId: '',
        imageUrl: '',
        imageData: '',
        linkedIn: '',
        github: '',
        social: '',
        institude: ''
    }

export default function EditFormDialogs({ EditData }) {
  const [open, setOpen] = React.useState(false);
  const [userData,setUserData] = useState(initalUserData)
  const dispatch = useDispatch();
  const classes1 = useStyles();
//   const history = useNavigate();
  useEffect(() => {
    if (EditData) setUserData(EditData); // setting the new data to which got from the form const[postData,setPostData]
  }, [EditData]);
  
    // console.log(userData.email)

  
  const handleClickOpen = () => {
    setOpen(true);
  };

    const handleClose = () => {
        // console.log(userData._id)
        // alert({ userData })
    dispatch(updateUserProfile(userData._id, userData));
    for (let i = 0; i < 1000000; i++){
        
    }
    window.location.reload();
    // history(`/posts/${currentId}`)
    setOpen(false);
  };

  const handleClosePopUp = () => {
    setOpen(false);
  };

  
  return (
    <div>
      <div onClick={handleClickOpen}>Edit</div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><Typography>Edit Profile</Typography></DialogTitle>
        <DialogContent>
            <TextField style={{ margin: '10px 10px' }} name="name" variant="outlined" label="Title" fullWidth value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
            <TextField style={{ margin: '10px 10px' }} name="linkedIn" variant="outlined" label="LinkedIn Profile Link" fullWidth value={userData.linkedIn} onChange={(e) => setUserData({ ...userData, linkedIn: e.target.value })} />
            <TextField style={{ margin: '10px 10px' }} name="github" variant="outlined" label="Github Link" fullWidth value={userData.github} onChange={(e) => setUserData({ ...userData, github: e.target.value })} />
            <TextField style={{ margin: '10px 10px' }} name="social" variant="outlined" label="Social Media Link" fullWidth value={userData.social} onChange={(e) => setUserData({ ...userData, social: e.target.value })} />
            <TextField style={{margin: '10px 10px'}} name="institude" variant="outlined" label="Your current Organization" fullWidth value={userData.institude} onChange={(e) => setUserData({ ...userData, institude: e.target.value })} />
            <div style={{ margin: '10px 10px' }} className={classes1.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setUserData({ ...userData, imageData: base64 })} /></div>
            <Divider style={{ margin: '20px 0' }} /> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUp}>Cancel</Button>
          <Button onClick={handleClose}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}
