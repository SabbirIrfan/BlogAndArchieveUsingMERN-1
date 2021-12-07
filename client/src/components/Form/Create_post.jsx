import { FETCH_POST } from '../../constants/actionTypes';

import Form from './Form';
import React, { useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import post from '../Posts/Post/Post';
const Create_post = ({post}) => {
  const [currentId, setCurrentId] = useState(0);
  const user = JSON.parse(localStorage.getItem('profile'));

 
//   setCurrentId(post._id);
  return (
        <Grow in>
            <Container maxWidth="xl" >
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} >
                    <Grid item xs={12} sm={6} md={9}>  
                         <Form currentId={currentId} setCurrentId={setCurrentId} userstate={1} />

                    </Grid>
                    
                </Grid>
            </Container>
        </Grow>
    )
}

export default Create_post
