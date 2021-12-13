import React from 'react';
import Pdf from './pdf/Pdf'
import { Container, Grid, AppBar, TextField, Button, Paper, Fab, Typography } from '@material-ui/core';

const PDFS = () => {
    return (
        <Container>
            <Grid>
                <Grid>
                    <Pdf />
                    <Pdf />
                </Grid>
            </Grid>
        </Container>
    )
}

export default PDFS
