import React, { useState, useEffect } from 'react';
import { Grow, Grid, Container, Paper ,AppBar,TextField,Button} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from 'react-redux';
import {useNavigate,useLocation} from 'react-router-dom'
import ChipInput from 'material-ui-chip-input';

import { getPosts,getPostsBySearch } from '../../actions/posts';
import useStyles from '../../styles';
import Pagination from '../Pagination'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({userstate}) => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const history = useNavigate();    
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    const searchPost = () => {
      if (search.trim() || tags) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      } else {
        history('/');
      }
    };
    const handleKeyPress = (e) => {
      if(e.keyCode === 13){
        searchPost();
      }
    }
    const handleAddChip = (tag) => setTags([...tags, tag]); 
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
  // console.log(userstate + "In the Home page.");
    return (
        <Grow in>
        <Container maxWidth = "xl">
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer} >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
               name="Search"
               varient="outlined"
               label="Search"
               onKeayPress={handleKeyPress}
               fullWidth
               value={search}
               onChange={(e) =>setSearch(e.target.value)}
               />
               <ChipInput 
               style= {{ margin: '10px 0' }}
               value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
               label = "Search Tags"
               variant="outlined"
               />
               <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary"> Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} userstate={userstate} />
                {(!searchQuery && !tags.length) && (
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    );
};

export default Home;