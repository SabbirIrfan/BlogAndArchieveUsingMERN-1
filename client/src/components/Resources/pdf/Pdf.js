import React, {useState} from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Avatar, Link } from '@material-ui/core';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../../actions/posts';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom'
import CardActionArea from '@mui/material/CardActionArea';


const Pdf = ({ post, setCurrentId, imgUrl }) => {
    // const classes = useStyles();
  
  return (
    <Card  raised elevation={6}>
        
        <div >
           <h1> pdf</h1>
        
          </div>
      
     
     
    </Card>
  );
};
export default Pdf;