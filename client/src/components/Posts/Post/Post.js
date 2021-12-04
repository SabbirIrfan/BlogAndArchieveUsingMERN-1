import React, {useState} from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../../actions/posts';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom'
import CardActionArea from '@mui/material/CardActionArea';


const Post = ({ post, setCurrentId, imgUrl }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

   const [likes, setLikes] = useState(post?.likes);

  const user = JSON.parse(localStorage.getItem('profile'));

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };


  const Likes = () => {
    if (post?.likes?.length > 0) {
      return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><FavoriteIcon fontSize="small" style={{color: '#415b7c' , margin: '0px 0px' , padding: '0px 0px'}} />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><FavoriteBorderIcon style={{color: '#415b7c', margin: '0px 0px' , padding: '0px 0px'}} fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><FavoriteBorderIcon style={{color: '#415b7c', margin: '0px 0px', padding: '0px 0px'}} fontSize="small" />&nbsp;Like</>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, navigate));

    navigate(`/posts/${post._id}`);
  };
  
  return (
    <Card className={classes.card} raised elevation={6}>
       <CardActionArea onClick={openPost}>
        {/* <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} /> */}
        <CardMedia className={classes.media} image={imgUrl} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" noWrap={true} component="p">{post.message}</Typography>
        </CardContent>
         </CardActionArea>
     
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" style={{color: '#334155'}} onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" style={{color: '#334155'}} /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default Post;