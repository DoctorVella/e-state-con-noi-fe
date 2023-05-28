import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import NewPlayerModal from "../components/NewPlayerModal";
import ViewPlayerModal from "../components/ViewPlayerModal";
import AdminPageContainer from "../components/AdminPageContainer";
import IscrittoreBackground from '../img/IscrittoreBackground.png';

const IscrittorePage = () => {
    const [openNewPlayerModal, setOpenNewPlayerModal] = useState(false);
    const [openViewPlayersModal, setOpenViewPlayersModal] = useState(false);
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            {isLargeScreen ?
                <AdminPageContainer>
                    <Grid container rowSpacing={2} columnSpacing={5}>
                        <Grid item xs={0} md={2} />
                        <Grid item xs={12} md={4}>
                            <Card raised>
                                <CardContent>
                                    <Typography variant='h3'>Vuoi iscrivere un partecipante?</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => { setOpenNewPlayerModal(true); }}>Iscrivi</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card raised>
                                <CardContent>
                                    <Typography variant='h3'>Vuoi consultare i tuoi partecipanti?</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => { setOpenViewPlayersModal(true); }}>Consulta</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={0} md={2} />
                    </Grid>
                </AdminPageContainer> : <Paper sx={{ p: 3 }} style={{ minHeight: "100vh", backgroundImage: `url(${IscrittoreBackground})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <Grid container rowSpacing={2} columnSpacing={5}>
                        <Grid item xs={12}>
                            <Box sx={{p:22}} />
                        </Grid>
                        <Grid item xs={12}>
                            <Card raised>
                                <CardContent>
                                    <Typography variant='h3'>Vuoi iscrivere un partecipante?</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => { setOpenNewPlayerModal(true); }}>Iscrivi</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card raised>
                                <CardContent>
                                    <Typography variant='h3'>Vuoi consultare i tuoi partecipanti?</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => { setOpenViewPlayersModal(true); }}>Consulta</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{p:6}} />
                        </Grid>
                    </Grid>
                </Paper>
            }
            <NewPlayerModal open={openNewPlayerModal} setOpen={setOpenNewPlayerModal} />
            <ViewPlayerModal open={openViewPlayersModal} setOpen={setOpenViewPlayersModal} />
        </>
    );
}

export default IscrittorePage;