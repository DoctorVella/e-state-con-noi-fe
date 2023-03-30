import { BorderColorOutlined, DeleteOutline, KeyboardArrowDown } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ActivityModal from "../components/ActivityModal";
import SectionHeader from "../components/SectionHeader";
import SubactivityModal from "../components/SubactivityModal";
import useDayActions from "../services/useDayActions";
import { ACTIVITY_TYPES, ACTIVITY_TYPE_KEY_PROVA_ANIMATORE, ACTIVITY_TYPE_KEY_STAFFETTA_1_VS_1, ACTIVITY_TYPE_KEY_STAFFETTA_1_VS_1_ACQUA, ACTIVITY_TYPE_KEY_STAFFETTA_ALL_VS_ALL, ACTIVITY_TYPE_KEY_STAFFETTA_ALL_VS_ALL_ACQUA, SUBACTIVITY_TYPES, SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1, SUBACTIVITY_TYPE_KEY_MANCHE_ALL_VS_ALL } from "../util/Constants";
import { getTeamColors } from "../util/MuiTheme";

const DayPage = () => {
    const [dayDate, setDayDate] = useState((new Date()).toISOString().split("T")[0]);
    const [activities, setActivities] = useState([]);
    const [openActivityModal, setOpenActivityModal] = useState(false);
    const [openSubactivityModal, setOpenSubactivityModal] = useState(false);
    const activityDefaultValues = {
        name: "",
        type: "",
        description: ""
    }
    const [activityInitialValues,setActivityInitialValues] = useState(activityDefaultValues);
    const [subactivityInitialValues,setSubactivityInitialValues] = useState();
    const [fetch,setFetch] = useState(0);
    const dayActions = useDayActions();

    const fetchDay = async (day) => {
        let res = await dayActions.findDay(day);
        if(res) {
            setActivities(res.activities);
        }
    }

    useEffect(()=>{
        fetchDay(dayDate);
    },[dayDate])

    const removeActivity = (a) => {
        setActivities(activities.filter(activity => activity.name !== a.name || activity.type !== a.type));
        dayActions.createUpdateDay(dayDate,activities);
    }

    const addActivity = () => {
        setActivityInitialValues(activityDefaultValues);
        setOpenActivityModal(true);
    }

    const modifyActivity = (a) => {
        setActivityInitialValues(a);
        a.modifying = true;
        setOpenActivityModal(a);
    }

    const provideActivity = (values) => {
        delete values.modifying;
        if(values.type === ACTIVITY_TYPE_KEY_STAFFETTA_ALL_VS_ALL || values.type === ACTIVITY_TYPE_KEY_STAFFETTA_ALL_VS_ALL_ACQUA) {
            values.subactivities = [{type: SUBACTIVITY_TYPE_KEY_MANCHE_ALL_VS_ALL}];
        }else{
            values.subactivities = [];
        }
        let index = activities.findIndex(activity => activity.modifying);
        let temp = activities;
        if(index >= 0) {
            temp.splice(index,1,values);
        }else{
            temp.push(values);
        }
        setActivities(temp);
        dayActions.createUpdateDay(dayDate,activities);
    }

    const canAddSubactivity = (activity) => {
        if(activity.type === ACTIVITY_TYPE_KEY_PROVA_ANIMATORE) {
            return false;
        }else if(activity.type === ACTIVITY_TYPE_KEY_STAFFETTA_ALL_VS_ALL && activity.subactivities?.length > 0) {
            return false;
        }else if(activity.type === ACTIVITY_TYPE_KEY_STAFFETTA_ALL_VS_ALL_ACQUA && activity.subactivities?.length > 0) {
            return false;
        }else if(activity.type === ACTIVITY_TYPE_KEY_STAFFETTA_1_VS_1 && activity.subactivities?.length > 0) {
            return false;
        }else if(activity.type === ACTIVITY_TYPE_KEY_STAFFETTA_1_VS_1_ACQUA && activity.subactivities?.length > 0) {
            return false;
        }else{
            return true;
        }
    }

    const removeSubactivity = (activity,subactivity) => {
        activity.subactivities = activity.subactivities.filter(s => s !== subactivity);
        setFetch(fetch+1);
        dayActions.createUpdateDay(dayDate,activities);
    }

    const addSubactivity = (activity) => {
        let initVal = {
            type: ACTIVITY_TYPES.get(activity.type).subactivityTypeKey
        }
        if(initVal.type !== SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1) {
            initVal.name = "";
            initVal.description = "";
        }else{
            initVal.manche1team1 = "";
            initVal.manche1team2 = "";
            initVal.manche2team1 = "";
            initVal.manche2team2 = "";
        }
        setSubactivityInitialValues(initVal);
        activity.modifying = true;
        setOpenSubactivityModal(true);
    }

    const modifySubactivity = (activity,subactivity) => {
        setSubactivityInitialValues(subactivity);
        activity.modifying = true;
        subactivity.modifying = true;
        setOpenSubactivityModal(true);
    }

    const provideSubactivity = (values) => {
        let activity = activities?.find(activity => activity.modifying);
        delete activity.modifying;
        let index = activity?.subactivities.findIndex(subactivity => subactivity.modifying);
        delete values.modifying;
        if(index >= 0) {
            activity.subactivities.splice(index,1,values);
        }else{
            activity.subactivities.push(values);
        }
        setFetch(fetch+1);
        dayActions.createUpdateDay(dayDate,activities);
    }

    return (
        <>
            <Grid container spacing={2}>
                <SectionHeader title="Gestione Giornate" />
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={2} >
                    <TextField
                        fullWidth
                        label="Giorno"
                        type={"date"}
                        value={dayDate}
                        onChange={e => {setDayDate(e.target.value)}}
                    />
                </Grid>
                <Grid item xs={0} md={4} />
                <Grid item xs={12} md={2}>
                    <Button fullWidth size="large" variant="contained" onClick={() => { addActivity() }}>Aggiungi attività</Button>
                </Grid>
                <Grid item xs={0} md={2} />
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={8}>
                    {activities?.map(a => 
                        <Accordion key={a.name}>
                            <AccordionSummary expandIcon={<KeyboardArrowDown/>}>
                                <Typography variant="h5">
                                    {a.name}
                                    <Chip sx={{ml: "10px", mr: "10px", color: "white", backgroundColor: ACTIVITY_TYPES.get(a.type).chipColor}} label={ACTIVITY_TYPES.get(a.type).label}/>
                                </Typography>
                                <IconButton color="primary" onClick={() => { modifyActivity(a) }}><BorderColorOutlined/></IconButton>
                                <IconButton color="primary" onClick={() => { removeActivity(a) }}><DeleteOutline/></IconButton>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography align="left">{a.description}</Typography>
                                {a.subactivities?.map(s =>
                                    <div key={s.name + s.type}>
                                        <div className="Divider" style={{marginTop: "10px", marginBottom: "10px"}} />
                                        <Typography align="left">
                                            {SUBACTIVITY_TYPES.get(s.type).label + (s.name ? " - " + s.name : "")}
                                            {s.type !== SUBACTIVITY_TYPE_KEY_MANCHE_ALL_VS_ALL ? <IconButton color="primary" onClick={() => { modifySubactivity(a,s) }}><BorderColorOutlined/></IconButton> : null}
                                            {s.type !== SUBACTIVITY_TYPE_KEY_MANCHE_ALL_VS_ALL ? <IconButton color="primary" onClick={() => { removeSubactivity(a,s) }}><DeleteOutline/></IconButton> : null}
                                        </Typography>
                                        {s.type === SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1 ? <>
                                            <Typography align="left">
                                                <Chip sx={{m: "10px", fontSize:"18px", color: getTeamColors(s.manche1team1), backgroundColor: "white"}} label={s.manche1team1}/>
                                                VS
                                                <Chip sx={{m: "10px", fontSize:"18px", color: getTeamColors(s.manche1team2), backgroundColor: "white"}} label={s.manche1team2}/>
                                            </Typography>
                                            <Typography align="left">
                                                <Chip sx={{m: "10px", fontSize:"18px", color: getTeamColors(s.manche2team1), backgroundColor: "white"}} label={s.manche2team1}/>
                                                VS 
                                                <Chip sx={{m: "10px", fontSize:"18px", color: getTeamColors(s.manche2team2), backgroundColor: "white"}} label={s.manche2team2}/>
                                            </Typography>
                                        </> : null}
                                        <Typography align="left">{s.description}</Typography>
                                    </div>
                                )}
                                {canAddSubactivity(a) ? <Button onClick={() => { addSubactivity(a) }}>
                                    Aggiungi {SUBACTIVITY_TYPES.get(ACTIVITY_TYPES.get(a.type).subactivityTypeKey)?.label}
                                </Button> : null}
                            </AccordionDetails>
                        </Accordion>
                    )}
                </Grid>
                <Grid item xs={0} md={2} />
            </Grid>
            <ActivityModal open={openActivityModal} setOpen={setOpenActivityModal} provideActivity={provideActivity} initialValues={activityInitialValues} />
            <SubactivityModal open={openSubactivityModal} setOpen={setOpenSubactivityModal} provideSubactivity={provideSubactivity} initialValues={subactivityInitialValues} />
        </>
    );
}

export default DayPage;