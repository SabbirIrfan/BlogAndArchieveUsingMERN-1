import React from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import moment from 'moment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Post = ({ post, setCurrentId }) => {

    const classes = useStyles();
    
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={( ) => {setCurrentId(post._id)}}>
                    <MoreHorizIcon fontsize="default"></MoreHorizIcon>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) =>`#${tag} `)}</Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant="h5"gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => { }}>
                    <ThumbUpAltIcon fontsize="small"></ThumbUpAltIcon>
                    Like
                    {post.likecount}
                </Button>
                <Button size="small" color="primary" onClick={() => { }}>
                    <DeleteIcon fontSize="small">
                    </DeleteIcon>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;