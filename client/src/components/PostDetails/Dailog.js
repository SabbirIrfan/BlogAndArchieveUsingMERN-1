import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
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
import { updatePost } from '../../actions/posts';
import ChipInput from 'material-ui-chip-input';
import useStyles from './formStyle';


// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

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

export default function CustomizedDialogs({currentId}) {
  const [open, setOpen] = React.useState(false);
  // const classes = styles;

  ///FORM WORK

  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes1 = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useNavigate();
  // clears the post form to it's default state
  //populating the form with post data to update
  useEffect(() => {
    if (!post?.title) clear();
    console.log(post)
    if (post) setPostData(post); // setting the new data to which got from the form const[postData,setPostData]
  }, [post]);
  

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const clear = () => {
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  };
  
  const handleClose = () => {
    dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    for (let i = 0; i < 1000000; i++){
        
    }
    clear();
    window.location.reload();
    history(`/posts/${currentId}`)
    setOpen(false);
  };

   const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };
  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };


  
  return (
    <div>
      <div onClick={handleClickOpen}>Edit</div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><Typography variant="h4">Edit Post</Typography></DialogTitle>
        <DialogContent>
        <TextField style={{margin: '10px 10px'}} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField style={{margin: '10px 10px'}} name="message" variant="outlined" label="Message" fullWidth multiline rows={6} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
         <div >
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        
          <div style={{ margin: '10px 10px' }} className={classes1.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Divider style={{ margin: '20px 0' }} /> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}
