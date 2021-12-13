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
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import { updateContribute, getContributionByPostId } from '../../actions/posts';
import ChipInput from 'material-ui-chip-input';
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


// const styles = theme => ({
//   root: {
//     flexGrow: 1
//   },
//   primaryColor: {
//     color: teal[500]
//   },
//   secondaryColor: {
//     color: grey[700]
//   },

//   padding: {
//     padding: 0
//   },
//   mainHeader: {
//     backgroundColor: grey[100],
//     padding: 20,
//     alignItems: "center"
//   },
//   mainContent: {
//     padding: 40
//   },
//   secondaryContainer: {
//     padding: "20px 25px",
//     backgroundColor: grey[200]
//   }
// });

const initialContriData = {
  message: '',
  creator: '',
  name: '',
  selectedFile: [],
  likes: [],
  creatorImgUrl: '',
  creatorEmail: '',
}
 



export default function ContributeDailog({currentId, setContributedSinglePostData}) {
  const [open, setOpen] = React.useState(false);
  const [contributednewPost, setContributednewPost] = useState(initialContriData)
  const dispatch = useDispatch();
  const classes1 = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useNavigate();
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const clear = () => {
    setContributednewPost(initialContriData);
  };
  
  const handleClose = () => {
    // console.log('hii')
    console.log(contributednewPost)
    dispatch(updateContribute(currentId, { ...contributednewPost, creator: user.result.name, creatorEmail: user.result.email, creatorImgUrl: user.result.imageData }));
    for (let i = 0; i < 1000000; i++){
        
    }
    clear();
    // window.location.reload();
    history(`/posts/${currentId}`)
    dispatch(getContributionByPostId(currentId, setContributedSinglePostData));
    setOpen(false);
    };
    
    const handleClosePopUp = () => {
    setOpen(false);
  };


  return (
      <div>
          <Typography>Wanna contribute? <Button onClick={handleClickOpen}>Contribute</Button></Typography>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle><Typography variant="h4">Contribute</Typography></DialogTitle>
              <DialogContent>
                  <TextField style={{ margin: '10px 10px' }} name="message" variant="outlined" label="Message" fullWidth multiline rows={6} value={contributednewPost.message} onChange={(e) => setContributednewPost({ ...contributednewPost, message: e.target.value })} />
                  <div style={{ margin: '10px 10px' }} className={classes1.fileInput}><FileBase type="file" multiple={true} onDone={(base64) => setContributednewPost({ ...contributednewPost, selectedFile: base64 })} /></div>
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
