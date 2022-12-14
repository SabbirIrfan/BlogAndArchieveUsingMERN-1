import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';
import RichText from './RichText';

const Form = ({ currentId, setCurrentId, userstate }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: [], creatorImgUrl: '', creatorEmail: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  // console.log(user)
  const creatorImgUrl = user.result.imageData;
  const creatorEmail = user.result.email;
  // console.log(creatorImgUrl)
  const history = useNavigate();
  // clears the post form to it's default state
  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: [] });
  };

  //populating the form with post data to update
  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post); // setting the new data to which got from the form const[postData,setPostData]
  }, [post]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postData);
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name, creatorImgUrl:creatorImgUrl, creatorEmail: creatorEmail }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name, creatorImgUrl:creatorImgUrl }));
      for (let i = 0; i < 1000000; i++){
        
      }
      clear();
      history(`/posts/${currentId}`)
    }
  };
  if (!user?.result?.name && userstate == null) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign in to share your thoughts and much more.
        </Typography>
      </Paper>
    );
  }
  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };
  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  // if (userstate != null) {
  return (

    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Updating "${post.title}"` : 'Share Your Thought and Experience'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        {/* <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} /> */}
        <RichText postData={postData}/>
          <ChipInput
          
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        <div className={classes.fileInput} style={{margin: '5px 5px'}}><FileBase type="file" multiple={true} onDone={(base64) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" className={classes.buttonClear} size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );

};

export default Form;