import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  direct_to_sign_in: {
    width: '80%',
    padding: '15px 22px',
    margin: '10px 5px',
    box: 'border-box',
  },
  paper: {
    padding: theme.spacing(2),
  },
  form : {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '90%',
    margin: '10px 0',
  },
  signin_up: {
    marginLeft: '20rem',
  },
    buttonSubmit: {
    marginBottom: 10,
    backgroundColor: '#598da6',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#5d6e7a',
    }
  },
  buttonClear : {
    backgroundColor: '#ea9b80',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#5d6e7a',
    }
  },
}));