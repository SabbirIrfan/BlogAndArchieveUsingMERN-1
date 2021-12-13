import React, { useState, useEffect } from 'react';
import { Card,CardContent, Typography, Avatar, Button, Divider,Paper, Menu, MenuItem } from '@material-ui/core';
// import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import useStyles from './styles';
import { useParams, useNavigate} from 'react-router-dom';
import { getUserById } from '../../actions/profile';
import { getSingleUserPosts } from '../../actions/posts';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditFormDialogs from './FormDailog';


const initalUserData = {
        _id: '',
        name: '',
        email: '',
        password: '',
        profileImg: '',
        googleId: '',
        imageUrl: '',
        imageData: '',
        linkedIn: '',
        github: '',
        social: '',
        institude: ''
    }
const MainProfile = ( ) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [userData, setUserData] = useState(initalUserData);
    const [allposts, setAllPosts] = useState([])
    
    const history = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const classes = useStyles();
    // console.log(userData)
    const setUserProfileData = (data) => {
        setUserData(data[0]);
    }

    useEffect(() => {
        dispatch(getUserById(id, setUserProfileData));
        dispatch(getSingleUserPosts(id, setAllPosts))
    }, [id]);

    /// UserPost
    // console.log(allposts)
    // const loggeduser = JSON.parse(localStorage.getItem('profile'));
    const openPost = (_id) => history(`/posts/${_id}`);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseEdit = () => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleCloseHome = () => {
        setAnchorEl(null);
        history('/')
    };



    return (
        <div>
            <Card className={classes.card} raised elevation={6}>                
                <div className={classes.centerI}>
                    <Avatar className={classes.sizeAvatar} alt="User Image" src={userData.imageData}>
                    </Avatar>
                </div>
                <div className={classes.details}>
                    <Typography style={{padding: '0px 2px'}} variant="h5">{userData.name}</Typography>
                    <div style={{ display: 'inline-block' }}>
                        <a href={userData.linkedIn}> <LinkedInIcon></LinkedInIcon></a>
                        <a href={userData.github}> <GitHubIcon></GitHubIcon></a>
                        <a href={userData.social}> <FacebookIcon></FacebookIcon></a>
                    </div>
                    {(user?.result?.email === id) ? (
                    <div >
                        <Button onClick={handleClick}
                        style={{ color: '#334155' }}
                        size="small">
                            <MoreVertIcon fontSize="medium" />
                            </Button>
                            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}>
                                <MenuItem onClick={handleCloseEdit}> <EditFormDialogs EditData={userData}> </EditFormDialogs></MenuItem>
                                <MenuItem onClick={handleCloseHome}>Back to Home</MenuItem>
                                <MenuItem onClick={handleClose}>Close</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div >
                            <Button onClick={handleClick}
                                style={{ color: '#334155' }}
                                size="small">
                                <MoreVertIcon fontSize="medium" />
                            </Button>
                            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}>
                                <MenuItem onClick={handleCloseHome}>Back to Home</MenuItem>
                                <MenuItem onClick={handleClose}>Close</MenuItem>
                            </Menu>
                        </div>
                    )}

                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{userData.institude}</Typography>
            </Card>
            <Paper style={{borderRadius: '15px' }} elevation={8}>
                {!!allposts.length && (
                    <div className={classes.section}>
                        <Typography gutterBottom variant="h5">{userData.name} posted :</Typography>
                        <Divider />
                        <div className={classes.allposts}>
                            {allposts.map(({ title, name, message, likes, _id }) => (
                                <Card className={classes.cardpost} style={{ backgroundColor: "#ffffff", margin: "5px 5px" }} elevation={6}>
                                    <div style={{ width: "100%", height: "100%", margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                        <Typography gutterBottom variant="h6" style={{ fontWeight: 'bold' }}>{title}</Typography>
                                        <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                        <CardContent>
                                            <Typography variant="subtitle2" color="textSecondary" noWrap={true}  >{message}</Typography>
                                        </CardContent>
                                        <Typography gutterBottom style={{ fontWeight: 'bold' }} variant="subtitle1">Likes: {likes.length}</Typography>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </Paper>
        </div>
    )
}

export default MainProfile;
