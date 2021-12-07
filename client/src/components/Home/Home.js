

import React, { useState } from 'react';
import {
  Container, Grid, AppBar, TextField, Button, Paper, Fab,
} from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import AddIcon from '@mui/icons-material/Add';
import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useNavigate();

  const searchPost = () => {
    if ((search === '' || search === 'Add keyword or tags') && tags.length === 0) {
      setSearch("Add keyword or tags")
    }
    else {
      if (search.trim() !== '' || tags) {
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      } else {
        history('/');
      }
    }

  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const create_post = () => {

    // dispatch({ type: actionType.CREATE });

    history('/addpost');


  };
  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <page>

      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} color="inherit">
              <Fab className={classes.fab_button} variant="extended" onClick={create_post}>

                <AddIcon />

                Create
              </Fab>
              <form className={classes.form} >
                <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search by text" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                <ChipInput fullWidth
                  style={{ margin: '10px 0' }}
                  value={tags}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(chip) => handleDeleteChip(chip)}
                  label="Search Tags"
                  variant="outlined"
                />
                <div className={classes.divBtn}>
                  <Button onClick={searchPost} className={classes.searchButton} fullWidth variant="contained">Search</Button>
                </div>

              </form>


              {/* <Form currentId={currentId} setCurrentId={setCurrentId} /> */}
              {(!searchQuery && !tags.length) && (
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )}
            </AppBar>

            {/* <div>
              <Fab className={classes.fab_button} variant="extended" onClick={create_post}>

                <AddIcon />

                Create
              </Fab>
            </div> */}
          </Grid>
        </Grid>
      </Container>
    </page>
  );
};

export default Home;
