import Form from './Form';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Grow, Grid,Typography,CardContent ,Card} from '@material-ui/core';
const Create_post = ({ post,userstate }) => {
    const [currentId, setCurrentId] = useState(0);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));


    if(!user?.result?.name && userstate == null) {
        
        return(
            <Card>
                <div>
                    <CardContent>
                        <Typography>
                            <h1>Please sign in to Participate</h1>
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        );
      }
    
    //   setCurrentId(post._id);
    return (
        <Form currentId={currentId} setCurrentId={setCurrentId} userstate={1} />
    );
}
export default Create_post;
