import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import useAuthActions from '../services/useAuthActions';
import HomeBackground from '../img/HomeBackground.png';
import HomeBackgroundDesktop from '../img/HomeBackgroundDesktop.png';

const HomePage = () => {
    const { setOpenLoginModal, setOpenRegisterModal } = useContext(GlobalContext);
    const [awaken, setAwaken] = useState(false);
    const authActions = useAuthActions();
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    useEffect(() => {
        if (!awaken) {
            authActions.awake();
            setAwaken(true);
        }
    }, [])

    return (
        <>
            {isLargeScreen ?
                <Paper sx={{ p: 3 }} style={{minHeight: "100vh", backgroundImage: `url(${HomeBackgroundDesktop})`, backgroundSize: "cover" }}>
                    <Grid container rowSpacing={2} columnSpacing={5}>
                        <Grid item xs={12}>
                            <Box sx={{ p: 20 }} />
                        </Grid>
                        <Grid item xs={0} md={2} />
                        <Grid item xs={12} md={8}>
                            <Box fontSize="24px" color="white" align='center'>
                                Il campo estivo per ragazzi organizzato dalla parrocchia Santa Fara.<br />
                                Dedicato ai ragazzi fra <Typography variant='paragraph' color="white" display='inline'>i 7 e i 14 anni</Typography>, si terrà nei seguenti giorni:<br />
                                - da <Typography variant='paragraph' color="white" display='inline'>lunedì 26 giugno</Typography> a <Typography variant='paragraph' color="white" display='inline'>venerdì 30 giugno</Typography><br />
                                - da <Typography variant='paragraph' color="white" display='inline'>lunedì 3 luglio</Typography> a <Typography variant='paragraph' color="white" display='inline'>venerdì 7 luglio</Typography><br />
                                Dalle <Typography variant='paragraph' color="white" display='inline'>ore 16.00</Typography> alle <Typography variant='paragraph' color="white" display='inline'>ore 20.00</Typography>.<br /><br />
                            </Box>
                        </Grid>
                        <Grid item xs={0} md={2} />
                        <Grid item xs={0} md={2} />
                        <Grid item xs={12} md={4}>
                            <Card raised>
                                <CardContent>
                                    <Typography variant='h3'>Non sei ancora registrato?</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => { setOpenRegisterModal(true); }}>Registrati</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card raised>
                                <CardContent>
                                    <Typography variant='h3'>Vuoi accedere alla tua area personale?</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => { setOpenLoginModal(true); }}>Accedi</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={0} md={2} />
                        <Grid item xs={12}>
                            <Box sx={{ p: 20 }} />
                        </Grid>
                    </Grid>
                </Paper> : <Paper sx={{ p: 3 }} style={{ minHeight: "100vh", backgroundImage: `url(${HomeBackground})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <Grid container rowSpacing={2} columnSpacing={5}>
                        <Grid item xs={12}>
                            <Box sx={{ p: 11 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Box fontSize="18px" color="white" align='center'>
                                Il campo estivo per ragazzi organizzato dalla parrocchia Santa Fara.<br />
                                Dedicato ai ragazzi fra <Typography variant='paragraph' color="white" display='inline'>i 7 e i 14 anni</Typography>, si terrà nei seguenti giorni:<br />
                                - da <Typography variant='paragraph' color="white" display='inline'>lunedì 26 giugno</Typography> a <Typography variant='paragraph' color="white" display='inline'>venerdì 30 giugno</Typography><br />
                                - da <Typography variant='paragraph' color="white" display='inline'>lunedì 3 luglio</Typography> a <Typography variant='paragraph' color="white" display='inline'>venerdì 7 luglio</Typography><br />
                                Dalle <Typography variant='paragraph' color="white" display='inline'>ore 16.00</Typography> alle <Typography variant='paragraph' color="white" display='inline'>ore 20.00</Typography>.<br /><br />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Card raised>
                                <CardContent>
                                    <Typography variant='h3'>Non sei ancora registrato?</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => { setOpenRegisterModal(true); }}>Registrati</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card raised>
                                <CardContent>
                                    <Typography variant='h3'>Vuoi accedere alla tua area personale?</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => { setOpenLoginModal(true); }}>Accedi</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ p: 6 }} />
                        </Grid>
                    </Grid>
                </Paper>
            }
        </>
    );
}

export default HomePage;