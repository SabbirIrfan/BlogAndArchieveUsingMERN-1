import Form from './Form';
import React, { useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
const Create_post = ({ post }) => {
    const [currentId, setCurrentId] = useState(0);


    //   setCurrentId(post._id);
    return (
        <Form currentId={currentId} setCurrentId={setCurrentId} userstate={1} />
    );
}
export default Create_post;
