import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  fab_button:{
    borderRadius: 10,
    marginTop: '1rem',
    marginBottom: '1rem',
    marginLeft: '.9rem',
    width: '7rem',
    slot: 'fixed',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent : 'center',
    color : '#475569',
    fontFamily:[
      'Arial Black',
    ],
    background: '#fffff9',
  },
  appBar: {
    borderRadius: 15,
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    position: "sticky",
    top: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '200px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      marginLeft:100,
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
    backgroundColor: '#9abf7a',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#5d6e7a',
    }
  },
  signin : {
    marginLeft: '20px',
    backgroundColor: '#ea9b80',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#5d6e7a',
    }
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {

    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginLeft:'3rem',
  },
  logo: {
    fontSize: '50px',
    color: '#ea9b80',
    marginBottom:'-.7rem'
  },
  Circularimg: {
    width: '60%',
    height: '60%',
    borderRadius: '50%',
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginLeft:'3rem',
  }
}));