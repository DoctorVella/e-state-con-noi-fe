import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import usePlayerActions from "../services/usePlayerActions";
import useTeamActions from "../services/useTeamActions";
import { DndContext } from '@dnd-kit/core';
import TeamDroppable from "../components/TeamDroppable";
import SectionHeader from "../components/SectionHeader";
import { AZZURRI_TEAM_NAME, GIALLI_TEAM_NAME, NOT_ASSIGNED_TEAM_NAME, ROSSI_TEAM_NAME, VERDI_TEAM_NAME } from "../util/Constants";

const TeamPage = () => {
    const playerActions = usePlayerActions();
    const teamActions = useTeamActions();
    const [teams, setTeams] = useState();
    const [changes, setChanges] = useState(new Map());
    const [isGenerateTeam, setIsGenerateTeam] = useState(true);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const teamNames = [AZZURRI_TEAM_NAME, GIALLI_TEAM_NAME, ROSSI_TEAM_NAME, VERDI_TEAM_NAME];

    const handleDragEnd = (event) => {
        const { over, active } = event;
        let teamPlayers = teams?.get(active.data.current);
        let playerIndex = teamPlayers.findIndex(p => active.id === p._id);
        teams?.get(over.id).push(teamPlayers[playerIndex]);
        teamPlayers.splice(playerIndex, 1);
        if(over.id !== NOT_ASSIGNED_TEAM_NAME) {
            changes.set(active.id, over.id);
        }else{
            changes.delete(active.id);
        }
        setIsGenerateTeam(false);
    }

    const fetchPlayers = async () => {
        let res = await playerActions.findPlayer();
        if (res) {
            let teamMap = new Map();
            teamMap.set(NOT_ASSIGNED_TEAM_NAME, []);
            teamNames.forEach(name => {
                teamMap.set(name, []);
            });
            res.filter(p => p.isPayed).forEach(p => {
                if (p.team) {
                    setIsGenerateTeam(false);
                    teamMap.get(p.team).push(p);
                } else {
                    teamMap.get(NOT_ASSIGNED_TEAM_NAME).push(p);
                }
            });
            setTeams(teamMap);
        }
    }

    useEffect(() => {
        fetchPlayers();
    }, [])

    const generateTeams = () => {
        setTeams(teamActions.buildTeams(teams, teamNames));
        teams.forEach((value, key) => {
            value.forEach(element => {
                changes.set(element._id, key);
            });
        });
        setIsGenerateTeam(false);
    }

    const saveChanges = async () => {
        if(changes.size === 0) {
            setOpenSuccessModal(true);
            return;
        }
        let changeArray = [];
        changes.forEach((value, key) => {
            changeArray.push({_id: key, team: value})
        });
        let res = await teamActions.persistTeamChanges(changeArray);
        if(res) {
            changes.clear();
            setOpenSuccessModal(true);
        }
    }

    return (<>
        <DndContext onDragEnd={handleDragEnd}>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <SectionHeader title="Gestione Squadre" />
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={8}>
                    {isGenerateTeam
                        ? <Button fullWidth onClick={() => { generateTeams(); }}>Genera Squadre</Button>
                        : <Button fullWidth onClick={() => { saveChanges(); }}>Salva Cambiamenti</Button> 
                    }
                </Grid>
                <Grid item xs={0} md={2} />
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={8}>
                    <TeamDroppable name={NOT_ASSIGNED_TEAM_NAME} players={teams?.get(NOT_ASSIGNED_TEAM_NAME)} />
                </Grid>
                <Grid item xs={0} md={2} />
                <Grid item xs={0} md={2} />
                {teamNames.map((id) => (
                    <Grid item xs={12} md={2} key={id}>
                        <TeamDroppable name={id} players={teams?.get(id)} />
                    </Grid>
                ))}
                <Grid item xs={0} md={2} />
            </Grid>
        </DndContext>
        <Dialog open={openSuccessModal}>
            <DialogTitle>
                Cambiamenti salvati!
            </DialogTitle>
            <DialogContent>
                I partecipanti sono stati assegnati alle squadre.
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {setOpenSuccessModal(false)}}>OK</Button>
            </DialogActions>
        </Dialog>
    </>);
}

export default TeamPage;