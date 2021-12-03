import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

function getUrl(num) {
  // let temp = Math.floor(Math.random() * 31);
  let st="https://raw.githubusercontent.com/NaimulHasanFahim/TechnicalWrittingCourse/main/background/back"+num+".png"
  // let st = "./Post/background/back" + temp.toString() + ".png"
  console.log(st)
  return st
}



const Posts = ({ setCurrentId }) => {
  const { posts } = useSelector((state) => state.posts);
  const classes = useStyles();

  // if (!posts.length() && !isLoading) return 'No posts';

  return (
    !posts?.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post post={post} setCurrentId={setCurrentId} imgUrl={getUrl(post.num)} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
