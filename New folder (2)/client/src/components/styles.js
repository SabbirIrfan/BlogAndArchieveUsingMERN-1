import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(()=>({
    ul:{
        justifyContent: 'space-around',
    },
     commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
}));