import React from "react";
import { withStyles, MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import { teal, grey } from "@material-ui/core/colors";
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  primaryColor: {
    color: teal[500]
  },
  secondaryColor: {
    color: grey[700]
  },

  padding: {
    padding: 0
  },
  mainHeader: {
    backgroundColor: grey[100],
    padding: 20,
    alignItems: "center"
  },
  mainContent: {
    padding: 40
  },
  secondaryContainer: {
    padding: "20px 25px",
    backgroundColor: grey[200]
  }
});

function EditForm(props) {
  const { classes, onClose, handleClose } = props;
  const [values, setValues] = React.useState({
      message: "",
      title: "",
      tags: [],
  });
    const navigate = useNavigate();
    const [isOpen, setisOpen] = React.useState(true);
    
    const handleChange = () => {
        console.log(values)
        // navigate('/')
    }
    const handleChangeCancel = () => {
        setisOpen(false)
    }

  return (
    <Dialog className={classes.root} fullWidth maxWidth="md" open={isOpen} onClose={() => onClose("wireModal")}>
          <DialogContent className={classes.padding}>
              <Grid container>
                  <Grid item xs={8}>
                      <Grid container direction="row" className={classes.mainHeader}>
                          <Grid item xs={8}>
                              <Typography className={classes.primaryColor} variant="h5">
                                  Edit Post
                              </Typography>
                          </Grid>
                      </Grid>
                      <Grid container direction="row" className={classes.mainContent} spacing={1} >
                          <Grid item xs={12}>
                              <TextField fullWidth margin="dense" variant="outlined" label="Title" id="title" value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField fullWidth multiline rows="6" margin="dense" variant="outlined" label="Message" id="message" value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField fullWidth margin="dense" variant="outlined" label="Tags (Comma separated)" id="tags" value={values.tags} onChange={(e) => setValues({ ...values, tags: e.target.value })} />
                          </Grid>
                          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => console.log('hi')} /></div>
           
                      </Grid>
                  </Grid>
                  <Grid container className="mt-auto">
                      <Grid item container ju>
                          <Grid item xs={12}>
                              <Button onClick={handleChange}>Save</Button>
                              <Button onClick={handleChangeCancel}>Cancel</Button>
                              <Button onClick={handleChange}>Close</Button>
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>
          </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(EditForm);
