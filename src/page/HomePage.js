import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import useAuthActions from '../services/useAuthActions';

const HomePage = () => {
    const { setOpenLoginModal, setOpenRegisterModal } = useContext(GlobalContext);
    const [awaken, setAwaken] = useState(false);
    const authActions = useAuthActions();

    useEffect(() => {
        if(!awaken) {
            authActions.awake();
            setAwaken(true);
        }
    },[])

    return (
        <>
            <Grid container rowSpacing={2} columnSpacing={5}>
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={8}>
                    <Typography variant='paragraph' paragraph>
                        Benvenuto sul sito di E...State Con Noi, il campo estivo per ragazzi organizzato dalla parrocchia Santa Fara. Il campo estivo, dedicato ai ragazzi fra i 7 e i 14 anni, si terrà nei seguenti giorni:<br />
                        - da lunedì 26 giugno a venerdì 30 giugno<br />
                        - da lunedì 2 luglio a venerdì 7 luglio<br />
                        Dalle ore 16.00 alle ore 20.00.
                    </Typography>
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
            </Grid>
        </>
    );
}

export default HomePage;