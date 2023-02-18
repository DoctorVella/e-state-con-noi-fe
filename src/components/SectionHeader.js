import { ArrowBack } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AUTH_LEVEL_ADMIN } from "../util/Constants";

const SectionHeader = ({title}) => {
    const navigate = useNavigate();

    return (localStorage.getItem("authLevel") === AUTH_LEVEL_ADMIN ?
    <Grid container item spacing={2}>
        <Grid item xs={0} md={2} />
        <Grid item xs={12} md={8}>
            <div className="Divider" />
        </Grid>
        <Grid item xs={0} md={2} />
        <Grid item xs={0} md={2} />
        <Grid item xs={3} md={1}>
            <IconButton variant="filled" onClick={() => { navigate("/admin") }}>
                <ArrowBack/>
            </IconButton>
        </Grid>
        <Grid item xs={7} md={6}>
            <Typography variant='h3'>{title}</Typography>
        </Grid>
        <Grid item xs={0} md={3} />
        <Grid item xs={0} md={2} />
        <Grid item xs={12} md={8}>
            <div className="Divider" />
        </Grid>
        <Grid item xs={0} md={2} />
    </Grid> : null);
}

export default SectionHeader;