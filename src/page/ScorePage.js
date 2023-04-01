import { Button, Chip, Grid, MenuItem, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import SectionHeader from "../components/SectionHeader";
import useDayActions from "../services/useDayActions";
import { useEffect, useState } from "react";
import { getTeamColors } from "../util/MuiTheme";
import { ACTIVITY_TYPES, AZZURRI_TEAM_NAME } from "../util/Constants";
import { GIALLI_TEAM_NAME } from "../util/Constants";
import { ROSSI_TEAM_NAME } from "../util/Constants";
import { VERDI_TEAM_NAME } from "../util/Constants";
import ScoreModal from "../components/ScoreModal";

const ScorePage = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const dayActions = useDayActions();
    const [activities, setActivities] = useState([]);
    const [dayDate, setDayDate] = useState("");
    const [openScoreModal, setOpenScoreModal] = useState(false);
    const [scoreInitialValues, setScoreInitialValues] = useState({});
    const [fetch, setFetch] = useState(0);

    const fetchDay = async (day) => {
        let res = await dayActions.findDay(day);
        if (res) {
            setActivities(res.activities);
        }
    }

    useEffect(() => {
        if (dayDate) {
            fetchDay(dayDate);
        }
    }, [dayDate])

    const addScore = (activity) => {
        setScoreInitialValues({});
        activity.modifying = true;
        setOpenScoreModal(true);
    }

    const provideScore = (values) => {
        let activity = activities?.find(activity => activity.modifying);
        delete activity.modifying;
        if (!activity.scoreList) {
            activity.scoreList = [];
        }
        activity.scoreList.push({
            description: values.description,
            teamScores: new Map([
                [AZZURRI_TEAM_NAME, values.azzurriScore],
                [GIALLI_TEAM_NAME, values.gialliScore],
                [ROSSI_TEAM_NAME, values.rossiScore],
                [VERDI_TEAM_NAME, values.verdiScore]
            ])
        });
        setFetch(fetch + 1);
    }

    return (<>
        <Grid container spacing={2}>
            <SectionHeader title="Gestione Punteggio" />
            <Grid item xs={0} md={2} />
            <Grid item xs={12} md={2} >
                <TextField
                    fullWidth
                    label="Giorno"
                    select
                    value={dayDate}
                    onChange={e => { setDayDate(e.target.value) }}
                >
                    <MenuItem key={"2023-03-31"} value={"2023-03-31"}>Test</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={0} md={6} />
            <Grid item xs={0} md={2} />
            {dayDate ?
                <Grid container item>
                    <Grid item xs={0} md={2} />
                    {isLargeScreen ?
                        <Grid container item rowSpacing={1} md={8}>
                            <Grid item md={4}>
                                <Typography variant="h6">Attività:</Typography>
                            </Grid>
                            <Grid item md={2}>
                                <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(AZZURRI_TEAM_NAME), color: "white" }} label="Azzurri:" />
                            </Grid>
                            <Grid item md={2}>
                                <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(GIALLI_TEAM_NAME), color: "white" }} label="Gialli:" />
                            </Grid>
                            <Grid item md={2}>
                                <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(ROSSI_TEAM_NAME), color: "white" }} label="Rossi:" />
                            </Grid>
                            <Grid item md={2}>
                                <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(VERDI_TEAM_NAME), color: "white" }} label="Verdi:" />
                            </Grid>
                            {activities.map(a => {
                                if (a?.scoreList?.length > 0) {
                                    return a.scoreList.map(s => <Grid container item rowSpacing={1}>
                                        <Grid item md={4}>
                                            <Typography>{ACTIVITY_TYPES.get(a.type).label} - {a.name}</Typography>
                                            <Typography>{s.description}</Typography>
                                        </Grid>
                                        <Grid item md={2}>
                                            <Typography>{s.teamScores.get(AZZURRI_TEAM_NAME)}</Typography>
                                        </Grid>
                                        <Grid item md={2}>
                                            <Typography>{s.teamScores.get(GIALLI_TEAM_NAME)}</Typography>
                                        </Grid>
                                        <Grid item md={2}>
                                            <Typography>{s.teamScores.get(ROSSI_TEAM_NAME)}</Typography>
                                        </Grid>
                                        <Grid item md={2}>
                                            <Typography>{s.teamScores.get(VERDI_TEAM_NAME)}</Typography>
                                        </Grid>
                                    </Grid>);
                                } else {
                                    return (<Grid container item rowSpacing={1}>
                                        <Grid item md={4}>
                                            <Typography>{ACTIVITY_TYPES.get(a.type).label} - {a.name}</Typography>
                                        </Grid>
                                        <Grid item md={2} />
                                        <Grid item md={4}>
                                            <Button fullWidth onClick={() => { addScore(a) }}>Aggiungi punteggio</Button>
                                        </Grid>
                                        <Grid item md={2} />
                                    </Grid>);
                                }
                            })}
                        </Grid> : activities.map(a => {
                            if (a?.scoreList?.length > 0) {
                                return a.scoreList.map(s => <Grid container item rowSpacing={1} xs={12}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">{ACTIVITY_TYPES.get(a.type).label}</Typography>
                                        <Typography variant="h6">{a.name}</Typography>
                                        <Typography variant="h6">{s.description}</Typography>
                                    </Grid>
                                    {s.teamScores.get(AZZURRI_TEAM_NAME) ?
                                        <Grid item xs={12}>
                                            <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(AZZURRI_TEAM_NAME), color: "white" }} label={"Azzurri: " + s.teamScores.get(AZZURRI_TEAM_NAME)} />
                                        </Grid> : null
                                    }
                                    {s.teamScores.get(GIALLI_TEAM_NAME) ?
                                        <Grid item xs={12}>
                                            <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(GIALLI_TEAM_NAME), color: "white" }} label={"Gialli: " + s.teamScores.get(GIALLI_TEAM_NAME)} />
                                        </Grid> : null
                                    }
                                    {s.teamScores.get(ROSSI_TEAM_NAME) ?
                                        <Grid item xs={12}>
                                            <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(ROSSI_TEAM_NAME), color: "white" }} label={"Rossi: " + s.teamScores.get(ROSSI_TEAM_NAME)} />
                                        </Grid> : null
                                    }
                                    {s.teamScores.get(VERDI_TEAM_NAME) ?
                                        <Grid item xs={12}>
                                            <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(VERDI_TEAM_NAME), color: "white" }} label={"Verdi: " + s.teamScores.get(VERDI_TEAM_NAME)} />
                                        </Grid> : null
                                    }
                                </Grid>);
                            } else {
                                return <Grid container item rowSpacing={1} xs={12}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">{ACTIVITY_TYPES.get(a.type).label}</Typography>
                                        <Typography variant="h6">{a.name}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth onClick={() => { addScore(a) }}>Aggiungi punteggio</Button>
                                    </Grid>
                                </Grid>
                            }
                        })
                    }
                    <Grid item xs={0} md={2} />
                </Grid> : null}
        </Grid>
        <ScoreModal open={openScoreModal} setOpen={setOpenScoreModal} provideScore={provideScore} />
    </>);
}

export default ScorePage;