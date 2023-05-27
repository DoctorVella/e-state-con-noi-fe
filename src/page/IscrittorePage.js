import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useState } from "react";
import NewPlayerModal from "../components/NewPlayerModal";
import ViewPlayerModal from "../components/ViewPlayerModal";
import AdminPageContainer from "../components/AdminPageContainer";

const IscrittorePage = () => {
    const [openNewPlayerModal, setOpenNewPlayerModal] = useState(false);
    const [openViewPlayersModal, setOpenViewPlayersModal] = useState(false);

    return (
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
            <NewPlayerModal open={openNewPlayerModal} setOpen={setOpenNewPlayerModal} />
            <ViewPlayerModal open={openViewPlayersModal} setOpen={setOpenViewPlayersModal} />
        </AdminPageContainer>
    );
}

export default IscrittorePage;