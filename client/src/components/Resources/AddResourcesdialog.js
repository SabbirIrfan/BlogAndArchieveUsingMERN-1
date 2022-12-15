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
import { addnewReasources } from '../../actions/pdfs';

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


const initialData = {
    title: '',
    creator: '',
    name: '',
    selectedFile: '',
}

export default function AddResourcesdialog() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const [userFiles, setUserFiles] = useState(initialData);
   const dispatch = useDispatch();
  const classes1 = useStyles();
//   const history = useNavigate();
//   useEffect(() => {
//     if (EditData) setUserData(EditData); // setting the new data to which got from the form const[postData,setPostData]
//   }, [EditData]);
  
    // console.log(userData.email)

  
  const handleClickOpen = () => {
    setOpen(true);
  };

    const handleSubmit = () => {
        // console.log(userData._id)
        // alert({ userData })
        // console.log(userFiles);
    dispatch(addnewReasources({...userFiles,creator: user?.result?.name }));

    // for (let i = 0; i < 1000000; i++){
        
    // }
    window.location.reload();
    // history(`/posts/${currentId}`)
    setOpen(false);
  };
  const handleClose = () => {
        // console.log(userData._id)
        // alert({ userData })
        // console.log(userFiles);
    // dispatch(addnewReasources({...userFiles,creator: user?.result?.name }));

    // for (let i = 0; i < 1000000; i++){
        
    // }
    window.location.reload();
    // history(`/posts/${currentId}`)
    setOpen(false);
  };

  
  return (
    <div>
      <Button  style={{ backgroundColor: "#E6C5C5",width: "100%", height: "100%",borderRadius:'.1rem', margin: "1px 1px"  }} onClick={handleClickOpen} >Upload</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><Typography>Edit Profile</Typography></DialogTitle>
        <DialogContent>
            <TextField style={{ margin: '10px 10px' }} name="title" variant="outlined" label="Title" fullWidth value={userFiles.title} onChange={(e) => setUserFiles({ ...userFiles, title: e.target.value })} />
            
            <div style={{ margin: '10px 10px' }} className={classes1.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setUserFiles({ ...userFiles, selectedFile: base64 })} /></div>
            <Divider style={{ margin: '20px 0' }} /> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}
