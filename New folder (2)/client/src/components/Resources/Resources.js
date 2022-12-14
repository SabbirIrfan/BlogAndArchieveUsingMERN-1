import React, { useState, useEffect } from 'react'
import PDFS from './PDFS';
import { useDispatch } from 'react-redux';
import { Grid, Card, CardContent, TextField, Button, Typography, Paper, Fab, CardActionArea } from '@material-ui/core';
import AddResourcesdialog from './AddResourcesdialog';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getallpdfs, deletePDF } from '../../actions/pdfs';
import useStyles from './styles';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
const Resources = () => {

    const [allpdfs, setAllpdfs] = useState(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // const classes = useStyles();

    // dispatch(getallpdfs(setAllpdfs));
    // console.log(allpdfs); 


    function download(x, y) {
        const add = y + '.pdf';
        axios({
            url: x,

            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', add);
            document.body.appendChild(link);
            link.click();
        });

    }
    useEffect(() => {
        dispatch(getallpdfs(setAllpdfs));

    }, [id]);

    let url = "";
    const Download = (selectedFile, title) => {
        url = selectedFile;
        download(url, title);
    }

    const deletepdf = (id) => {
        dispatch(deletePDF(id));
        window.location.reload();

    }

    return (

        <Grid>


            {allpdfs?.length && (

                <div >
                    <Card>
                        {(user?.result?.name ? (

                            <AddResourcesdialog></AddResourcesdialog>
                        ) : <div></div>)}
                    </Card>

                    {allpdfs.map(({ title, name, creator, selectedFile, _id }) => (




                        <Card style={{ backgroundColor: "#f1f5f9", width: "100%", height: "100%", borderRadius: '.1rem', margin: "3px 3px" }} elevation={2}>


                            <div style={{ width: "100%", height: "10%", margin: '10px', cursor: 'pointer' }}  >
                                <CardContent variant="h6" style={{ width: "100%", height: "10%", marginLeft: '0rem', marginTop: '1rem', fontWeight: 'bold' }} elevation={6}>
                                    <Typography variant='h4'>Title: {title}</Typography> 
                                    <Typography variant='h5'> Created By: {creator}</Typography>
                                    <CardActionArea style={{ marginTop: '.5rem' }}>

                                        <DownloadForOfflineIcon onClick={() => Download(selectedFile, title)} styles={{
                                            marginTop: '10rem',
                                            marginBottom: '1rem',
                                            marginLeft: '100rem',
                                            color: '#334155',

                                        }} />

                                        {(user?.result?.name === creator) && (

                                            <DeleteIcon style={{ color: 'black' }} onClick={() => deletepdf(_id)} />
                                        )}
                                    </CardActionArea>


                                </CardContent>

                                {/* <img src={selectedFile} width="200px" /> */}
                            </div>
                        </Card>
                    ))}
                </div>


            )
            }        </Grid>
    )
}

export default Resources
