import Form from './Form';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Grow, Grid, Typography, CardContent, Card, Button } from '@material-ui/core';
const Create_post = ({ post, userstate }) => {
    const [currentId, setCurrentId] = useState(0);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));


    if (!user?.result?.name && userstate == null) {
        const authe = () => {
            console.log("ads");
            navigate('/auth');
        }
        return (
            <Card>
                <CardContent>
                    <Typography>
                        <h3>Please <a href='/auth' style={{ color: 'black' }}>Sign in</a> or <a href='/auth' style={{ color: 'black' }}>Sign up</a> to share your thoughts and knowledge.</h3>
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    //   setCurrentId(post._id);
    return (
        <Form currentId={currentId} setCurrentId={setCurrentId} userstate={1} />
    );
}
export default Create_post;
