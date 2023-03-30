import { Grid } from "@mui/material";
import SectionHeader from "../components/SectionHeader";

const ScorePage = () => {

    return (<>
        <Grid container spacing={2}>
            <SectionHeader title="Gestione Punteggio" />
            <Grid item xs={0} md={2} />
            <Grid item xs={12} md={2} >
                ScorePage
            </Grid>
            <Grid item xs={0} md={2} />
        </Grid>
    </>);
}

export default ScorePage;