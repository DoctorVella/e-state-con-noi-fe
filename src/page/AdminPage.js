import { Button, Card, CardActions, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminPageContainer from "../components/AdminPageContainer";

const AdminPage = () => {
    const navigate = useNavigate();

    return (<AdminPageContainer>
        <Grid container rowSpacing={5} columnSpacing={5}>
            <Grid item xs={0} md={2} />
            <Grid item xs={12} md={4}>
                <Card raised>
                    <CardContent>
                        <Typography variant='h3'>Vuoi gestire i partecipanti?</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => { navigate("/players") }}>OK</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card raised>
                    <CardContent>
                        <Typography variant='h3'>Vuoi gestire le squadre?</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => { navigate("/teams") }}>OK</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={0} md={2} />
            <Grid item xs={0} md={2} />
            <Grid item xs={12} md={4}>
                <Card raised>
                    <CardContent>
                        <Typography variant='h3'>Vuoi gestire le giornate?</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => { navigate("/day") }}>OK</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card raised>
                    <CardContent>
                        <Typography variant='h3'>Vuoi gestire il punteggio?</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => { navigate("/score") }}>OK</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={0} md={2} />
        </Grid>
    </AdminPageContainer>);
}

export default AdminPage;
