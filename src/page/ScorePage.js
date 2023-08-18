import { Button, Chip, Grid, IconButton, MenuItem, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import SectionHeader from "../components/SectionHeader";
import useDayActions from "../services/useDayActions";
import { useEffect, useState } from "react";
import { getTeamColors } from "../util/MuiTheme";
import { ACTIVITY_TYPES, AZZURRI_TEAM_NAME, WEEK_DAY } from "../util/Constants";
import { GIALLI_TEAM_NAME } from "../util/Constants";
import { ROSSI_TEAM_NAME } from "../util/Constants";
import { VERDI_TEAM_NAME } from "../util/Constants";
import ScoreModal from "../components/ScoreModal";
import ConfirmModal from "../components/ConfirmModal";
import { DeleteOutline } from "@mui/icons-material";
import AdminPageContainer from "../components/AdminPageContainer";

const ScorePage = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const dayActions = useDayActions();
    const [activities, setActivities] = useState([]);
    const [dayDate, setDayDate] = useState("");
    const [dayList, setDayList] = useState([]);
    const [openScoreModal, setOpenScoreModal] = useState(false);
    const [openDeleteScoreModal, setOpenDeleteScoreModal] = useState(false);
    const [deleteDescription, setDeleteDescription] = useState("");
    const [fetch, setFetch] = useState(0);
    const [singleDayTotals, setSingleDayTotals] = useState([]);
    const [dayTotals, setDayTotals] = useState([]);
    const TOTAL_KEY = "total";

    const formatDayDate = (str) => {
        let date = new Date(str);
        return WEEK_DAY[date.getDay()-1] + " " + date.toLocaleDateString("it-IT");
    }

    const fetchDayList = async () => {
        let res = await dayActions.findDayList();
        if(res) {
            setDayList(res.sort((a,b) => Date.parse(a) - Date.parse(b)));
        }
    }

    useEffect(() => {
        fetchDayList();
    }, [])

    const fetchDay = async (day) => {
        if(day !== TOTAL_KEY) {
            let res = await dayActions.findDay(day);
            if (res) {
                setActivities(res.activities);
            }
        }else{
            let res = await dayActions.findDayTotal();
            if(res) {
                setDayTotals(res.sort((a,b) => Date.parse(a.day) - Date.parse(b.day)));
            }
        }
    }

    useEffect(() => {
        if (dayDate) {
            fetchDay(dayDate);
        }
    }, [dayDate])

    useEffect(() => {
        let totals = new Map();
        activities?.forEach(a => {
            a.scoreList?.forEach(s => {
                s.teamScores.forEach(ts => {
                    totals.set(ts.team, totals.has(ts.team) ? (totals.get(ts.team)+ts.score) : ts.score);
                });
            });
        });
        setSingleDayTotals(totals);
    }, [activities,singleDayTotals])

    const addScore = (activity) => {
        activity.modifying = true;
        setOpenScoreModal(true);
    }

    const removeScore = (activity,score) => {
        activity.modifying = true;
        score.modifying = true;
        setDeleteDescription("Eliminare " + score.description + " di " + activity.name + "?");
        setOpenDeleteScoreModal(true);
    }

    const closeDeleteScoreModal = (isOpen) => {
        let a = activities.find(activity => activity.modifying);
        if(a?.modifying) {
            delete a.modifying;
        }
        let s = a?.scoreList.find(score => score.modifying);
        if(!isOpen && s) {
            delete s.modifying;
        }
        setOpenDeleteScoreModal(false);
    }

    const confirmRemoveScore = () => {
        let activity = activities.find(activity => activity.modifying);
        delete activity.modifying;
        activity.scoreList = activity.scoreList.filter(s => !s.modifying);
        setFetch(fetch+1);
        dayActions.createUpdateDay(dayDate,activities);
    }

    const provideScore = (values) => {
        let activity = activities?.find(activity => activity.modifying);
        delete activity.modifying;
        if (!activity.scoreList) {
            activity.scoreList = [];
        }
        let teamScores = [];
        if(values.azzurriScore) {
            teamScores.push({team: AZZURRI_TEAM_NAME, score: values.azzurriScore});
        }
        if(values.gialliScore) {
            teamScores.push({team: GIALLI_TEAM_NAME, score: values.gialliScore});
        }
        if(values.rossiScore) {
            teamScores.push({team: ROSSI_TEAM_NAME, score: values.rossiScore});
        }
        if(values.verdiScore) {
            teamScores.push({team: VERDI_TEAM_NAME, score: values.verdiScore});
        }
        activity.scoreList.push({description: values.description, teamScores: teamScores});
        setFetch(fetch + 1);
        dayActions.createUpdateDay(dayDate,activities);
    }

    return (<AdminPageContainer>
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
                    {dayList?.map(d => <MenuItem key={d} value={d}>{formatDayDate(d)}</MenuItem>)}
                    <MenuItem key={TOTAL_KEY} value={TOTAL_KEY}>Totale</MenuItem> 
                </TextField>
            </Grid>
            <Grid item xs={0} md={6} />
            <Grid item xs={0} md={2} />
            {dayDate && dayDate !== TOTAL_KEY ?
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
                            {activities.map(a => a.scoreList?.map(s => <Grid key={a.type + a.name + a.description} container item rowSpacing={1}>
                                <Grid item md={4}>
                                    <Typography>{ACTIVITY_TYPES.get(a.type).label} - {a.name}</Typography>
                                    <Typography>
                                        {s.description}
                                        <IconButton color="primary" onClick={() => { removeScore(a,s) }}><DeleteOutline/></IconButton>
                                    </Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <Typography>{s.teamScores.find(ts => ts.team === AZZURRI_TEAM_NAME)?.score}</Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <Typography>{s.teamScores.find(ts => ts.team === GIALLI_TEAM_NAME)?.score}</Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <Typography>{s.teamScores.find(ts => ts.team === ROSSI_TEAM_NAME)?.score}</Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <Typography>{s.teamScores.find(ts => ts.team === VERDI_TEAM_NAME)?.score}</Typography>
                                </Grid>
                            </Grid>))}
                            {singleDayTotals?.size > 0 ? <Grid container item rowSpacing={1}>
                                <Grid item md={12}><div className="Divider" /></Grid>
                                <Grid item md={4}><Typography>Totale di giornata</Typography></Grid>
                                <Grid item md={2}><Typography>{singleDayTotals.get(AZZURRI_TEAM_NAME)}</Typography></Grid>
                                <Grid item md={2}><Typography>{singleDayTotals.get(GIALLI_TEAM_NAME)}</Typography></Grid>
                                <Grid item md={2}><Typography>{singleDayTotals.get(ROSSI_TEAM_NAME)}</Typography></Grid>
                                <Grid item md={2}><Typography>{singleDayTotals.get(VERDI_TEAM_NAME)}</Typography></Grid>
                                <Grid item md={12}><div className="Divider" /></Grid>
                            </Grid> : null}
                            {activities.map(a => <Grid key={a.type + a.name} container item rowSpacing={1}>
                                <Grid item md={4}>
                                    <Typography>{ACTIVITY_TYPES.get(a.type).label} - {a.name}</Typography>
                                </Grid>
                                <Grid item md={2} />
                                <Grid item md={4}>
                                    <Button fullWidth onClick={() => { addScore(a) }}>Aggiungi punteggio</Button>
                                </Grid>
                                <Grid item md={2} />
                            </Grid>)}
                        </Grid> : <Grid container item rowSpacing={1} xs={12}>
                            {activities.map(a => a.scoreList?.map(s => <Grid key={a.type + a.name + a.description} container item rowSpacing={1} xs={12}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">{ACTIVITY_TYPES.get(a.type).label}</Typography>
                                    <Typography variant="h6">{a.name}</Typography>
                                    <Typography variant="h6">
                                        {s.description}
                                        <IconButton color="primary" onClick={() => { removeScore(a,s) }}><DeleteOutline/></IconButton>
                                    </Typography>
                                </Grid>
                                {s.teamScores.find(ts => ts.team === AZZURRI_TEAM_NAME) ? <Grid item xs={12}>
                                    <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(AZZURRI_TEAM_NAME), color: "white" }} 
                                        label={"Azzurri: " + s.teamScores.find(ts => ts.team === AZZURRI_TEAM_NAME)?.score} />
                                </Grid> : null}
                                {s.teamScores.find(ts => ts.team === GIALLI_TEAM_NAME) ? <Grid item xs={12}>
                                    <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(GIALLI_TEAM_NAME), color: "white" }} 
                                        label={"Gialli: " + s.teamScores.find(ts => ts.team === GIALLI_TEAM_NAME)?.score} />
                                </Grid> : null}
                                {s.teamScores.find(ts => ts.team === ROSSI_TEAM_NAME) ? <Grid item xs={12}>
                                    <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(ROSSI_TEAM_NAME), color: "white" }} 
                                        label={"Rossi: " + s.teamScores.find(ts => ts.team === ROSSI_TEAM_NAME)?.score} />
                                </Grid> : null}
                                {s.teamScores.find(ts => ts.team === VERDI_TEAM_NAME) ? <Grid item xs={12}>
                                    <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(VERDI_TEAM_NAME), color: "white" }} 
                                        label={"Verdi: " + s.teamScores.find(ts => ts.team === VERDI_TEAM_NAME)?.score} />
                                </Grid> : null}
                            </Grid>))}
                            {singleDayTotals?.size > 0 ? <Grid container item rowSpacing={1} xs={12}>
                                <Grid item xs={12}><div className="Divider" /></Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Totale di giornata</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(AZZURRI_TEAM_NAME), color: "white" }} 
                                        label={"Azzurri: " + singleDayTotals.get(AZZURRI_TEAM_NAME)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(GIALLI_TEAM_NAME), color: "white" }} 
                                        label={"Gialli: " + singleDayTotals.get(GIALLI_TEAM_NAME)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(ROSSI_TEAM_NAME), color: "white" }} 
                                        label={"Rossi: " + singleDayTotals.get(ROSSI_TEAM_NAME)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(VERDI_TEAM_NAME), color: "white" }} 
                                        label={"Verdi: " + singleDayTotals.get(VERDI_TEAM_NAME)} />
                                </Grid>
                                <Grid item xs={12}><div className="Divider" /></Grid>
                            </Grid> : null}
                            {activities.map(a => <Grid key={a.type + a.name} container item rowSpacing={1} xs={12}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">{ACTIVITY_TYPES.get(a.type).label}</Typography>
                                    <Typography variant="h6">{a.name}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth onClick={() => { addScore(a) }}>Aggiungi punteggio</Button>
                                </Grid>
                            </Grid>)}
                        </Grid>
                    }
                    <Grid item xs={0} md={2} />
                </Grid> : null}
                {dayDate === TOTAL_KEY ? <Grid container item>
                    <Grid item xs={0} md={2} />
                    {isLargeScreen ? 
                        <Grid container item rowSpacing={1} md={8}>
                            <Grid item md={4}>
                                <Typography variant="h6">Giorno:</Typography>
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
                            {dayTotals.map(d => <Grid key={d.day} container item rowSpacing={1}>
                                {d.day === TOTAL_KEY ? <Grid item md={12}><div className="Divider" /></Grid> : null}
                                <Grid item md={4}><Typography>{d.day === TOTAL_KEY ? "TOTALE" : formatDayDate(d.day)}</Typography></Grid>
                                <Grid item md={2}>
                                    <Typography>{d.teamScores.find(ts => ts.team === AZZURRI_TEAM_NAME)?.score}</Typography>
                                </Grid> 
                                <Grid item md={2}>
                                    <Typography>{d.teamScores.find(ts => ts.team === GIALLI_TEAM_NAME)?.score}</Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <Typography>{d.teamScores.find(ts => ts.team === ROSSI_TEAM_NAME)?.score}</Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <Typography>{d.teamScores.find(ts => ts.team === VERDI_TEAM_NAME)?.score}</Typography>
                                </Grid>
                            </Grid>)}
                        </Grid> : <Grid container item rowSpacing={1} xs={12}>
                            {dayTotals.map(d => <Grid key={d.day} container item rowSpacing={1} xs={12}>
                                {d.day === TOTAL_KEY ? <Grid item xs={12}><div className="Divider" /></Grid> : null}
                                <Grid item xs={12}>
                                    <Typography variant="h6">{d.day === TOTAL_KEY ? "TOTALE" : formatDayDate(d.day)}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(AZZURRI_TEAM_NAME), color: "white" }} 
                                        label={"Azzurri: " + d.teamScores.find(ts => ts.team === AZZURRI_TEAM_NAME)?.score} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(GIALLI_TEAM_NAME), color: "white" }} 
                                        label={"Gialli: " + d.teamScores.find(ts => ts.team === GIALLI_TEAM_NAME)?.score} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(ROSSI_TEAM_NAME), color: "white" }} 
                                        label={"Rossi: " + d.teamScores.find(ts => ts.team === ROSSI_TEAM_NAME)?.score} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip sx={{ mb: "10px", fontSize: "20px", backgroundColor: getTeamColors(VERDI_TEAM_NAME), color: "white" }} 
                                        label={"Verdi: " + d.teamScores.find(ts => ts.team === VERDI_TEAM_NAME)?.score} />
                                </Grid>
                            </Grid>)}
                        </Grid>
                    }
                    <Grid item xs={0} md={2} />
                </Grid> : null}
        </Grid>
        <ScoreModal open={openScoreModal} setOpen={setOpenScoreModal} provideScore={provideScore} />
        <ConfirmModal open={openDeleteScoreModal} setOpen={closeDeleteScoreModal} title="Eliminare Punteggio?" description={deleteDescription} confirmFn={confirmRemoveScore} />
    </AdminPageContainer>);
}

export default ScorePage;