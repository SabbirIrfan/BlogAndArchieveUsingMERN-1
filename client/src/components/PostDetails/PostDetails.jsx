import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { Card, CardContent, Paper, Typography, CircularProgress, Divider, Button, Menu, MenuItem } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import CommentSection from './CommentSection';
import { deletePost } from '../../actions/posts';
import CustomizedDialogs from './Dailog';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
// import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import ContributeDailog from './ContributeDailog';
import { getContributionByPostId } from '../../actions/posts';

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const [ContributedSinglePostData, setContributedSinglePostData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseEdit = () => {
    setAnchorEl(null);
  };

  const handleCloseDelete = () => {
    setAnchorEl(null);
    dispatch(deletePost(post._id));
    history('/')
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleCloseHome = () => {
    setAnchorEl(null);
    history('/')
  };

  // console.log(ContributedSinglePostData)

  useEffect(() => {
    dispatch(getPost(id));
    dispatch(getContributionByPostId(id, setContributedSinglePostData));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }

  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history(`/posts/${_id}`);
  // console.log(posts);
  if (isLoading) {
    return (
      <div>
        <CircularProgress size="3em" style={{ color: '#ff675c', position: 'absolute' }} />
        <Paper elevation={6} className={classes.loadingPaper}>
          <Card elevation={6} style={{ backgroundColor: '#ebe5ff', borderRadius: '10px' }}> <Typography style={{ margin: '10px 10px' }} variant="h4">Loading....</Typography></Card>
        </Paper>
      </div>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  const user = JSON.parse(localStorage.getItem('profile'));

  function download() {
    for (let i = 0; i < post.selectedFile.length; i++) {
      axios({
        url: post.selectedFile[i].base64,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.png');
        document.body.appendChild(link);
        link.click();
      });

    }
  }

  return (

    <div>
      <Paper style={{ padding: '20px', marginBottom: '3px', borderRadius: '15px' }} elevation={6}>




        <div className={classes.card}>
          <div className={classes.section}>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) ? (
              <div >
                <Typography variant="h3" component="h2">{post.title}
                  <Button onClick={handleClick}
                    style={{ color: '#334155' }}
                    size="small"
                  >
                    <MoreHorizIcon fontSize="medium" />
                  </Button>
                </Typography>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                >

                  <MenuItem onClick={handleCloseEdit}> <CustomizedDialogs currentId={post._id}> </CustomizedDialogs></MenuItem>
                  <MenuItem onClick={handleCloseDelete}>Delete</MenuItem>
                  <MenuItem onClick={handleCloseHome}>Back to Home</MenuItem>
                  <MenuItem onClick={handleClose}>Close</MenuItem>
                </Menu>
              </div>
            ) : (
              <div >
                <Typography variant="h3" component="h2">{post.title}
                  <Button onClick={handleClick}
                    style={{ color: '#334155' }}
                    size="small"
                  >
                    <MoreHorizIcon fontSize="medium" />
                  </Button>
                </Typography>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose, handleCloseEdit, handleCloseDelete, handleCloseHome}
                >
                  <MenuItem onClick={handleCloseHome}>Back to Home</MenuItem>
                  <MenuItem onClick={handleClose}>Close</MenuItem>
                </Menu>
              </div>
            )}

            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
            <Typography variant="h6">Created by: {post.name}</Typography>
            <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>

          </div>
        </div>

      </Paper>

      <Card style={{ padding: '20px', marginBottom: '3px', borderRadius: '15px' }} elevation={6}>
        <CardContent>
          <button onClick={() => download()}
            style={{
              color: '#334155',
            }}
          >

            Download Images
          </button>
        </CardContent>

        <CardContent>

          <Slider {...settings}>


            {post.selectedFile.length>0 ?
              (<div className={classes.imageSection}>

                <img className={classes.media} src={post.selectedFile[0].base64 || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
              </div>) : <div></div>}


            {post.selectedFile.length>1 ?

              (<div className={classes.imageSection}>

                <img className={classes.media} src={post.selectedFile[1].base64 || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
              </div>) : <div></div>}


            {post.selectedFile.length>2 ?
              (<div className={classes.imageSection}>

                <img className={classes.media} src={post.selectedFile[2].base64 || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
              </div>) : <div></div>}


          </Slider>
        </CardContent>
      </Card>

      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            {/* lll */}
            <ContributeDailog currentId={post._id} setContributedSinglePostData={setContributedSinglePostData} />

            {!!ContributedSinglePostData.length && (
              <div className={classes.section}>
                <Typography gutterBottom variant="h5">Some user Contributed:</Typography>
                <Divider />
                <div className={classes.recommendedPosts}>

                  {ContributedSinglePostData.map(({ creator, message, selectedFile, _id }) => (
                    <Card className={classes.card} style={{ backgroundColor: "#ffffff", margin: "5px 5px" }} elevation={6}>

                      <div style={{ width: "100%", height: "100%", margin: '20px', cursor: 'pointer' }} key={_id}>
                        <Typography gutterBottom variant="h6" style={{ fontWeight: 'bold' }}>{creator}</Typography>
                        <CardContent>
                          <Typography gutterBottom variant="subtitle">{message}</Typography>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>


              </div>
            )}
            {/* <Divider style={{ margin: '20px 0' }} /> */}
          </div>
        </div>
        {/* lll */}
        <div className={classes.card}>
          <div className={classes.section}>
            {(user?.result?.googleId || user?.result?._id) ? (
              <div className="Parent">
                <Divider style={{ margin: '10px 0' }} />
                <CommentSection post={post} />
                <Divider style={{ margin: '20px 0' }} /></div>) : (<div></div>)}
          </div>
        </div>



        {
          !!recommendedPosts.length && (
            <div className={classes.section}>
              <Typography gutterBottom variant="h5">You might also like:</Typography>
              <Divider />
              <div className={classes.recommendedPosts}>

                {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                  <Card className={classes.card} style={{ backgroundColor: "#ffffff", margin: "5px 5px" }} elevation={6}>

                    <div style={{ width: "100%", height: "100%", margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                      <Typography gutterBottom variant="h6" style={{ fontWeight: 'bold' }}>{title}</Typography>
                      <Typography gutterBottom variant="subtitle2">{name}</Typography>
                      <CardContent>
                        <Typography variant="subtitle2" color="textSecondary" noWrap={true}  >{message}</Typography>
                      </CardContent>
                      <Typography gutterBottom style={{ fontWeight: 'bold' }} variant="subtitle1">Likes: {likes.length}</Typography>
                      {/* <img src={selectedFile} width="200px" /> */}
                    </div>
                  </Card>
                ))}
              </div>


            </div>
          )
        }
      </Paper >
    </div>
  );
};

export default Post;


