import Form from './Form';
import React, { useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
const Create_post = ({ post }) => {
    const [currentId, setCurrentId] = useState(0);


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
