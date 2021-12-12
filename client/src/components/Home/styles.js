import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  fab_button:{
    borderRadius: 100,
    marginBottom: '1rem',
    marginLeft: '.9rem',
    width: '13.3rem',
    slot: 'fixed',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent : 'center',
    color : 'black',
    background: '#bcc9b9',
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    position: "sticky",
    top: '7rem',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
    
  },
  divBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent : 'center',
  },
  searchButton: {
    size: "auto",
    backgroundColor: '#5d6e7a',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#5d6e7a',
    }
  },
}));