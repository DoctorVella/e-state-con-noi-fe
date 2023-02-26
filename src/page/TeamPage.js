import { Button, Grid } from "@mui/material";
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
    const [fetch, setFetch] = useState(0);
    const teamNames = [AZZURRI_TEAM_NAME, GIALLI_TEAM_NAME, ROSSI_TEAM_NAME, VERDI_TEAM_NAME];

    const handleDragEnd = (event) => {
        const {over, active} = event;
        let movedPlayer;
        let teamNamesWithNA = [...teamNames,NOT_ASSIGNED_TEAM_NAME];
        for(let nameIndex in teamNamesWithNA) {
            let teamPlayers = teams?.get(teamNamesWithNA[nameIndex]);
            let playerIndex = teamPlayers.findIndex(p => active.id === p._id);
            if(playerIndex !== -1) {
                movedPlayer = teamPlayers[playerIndex];
                teamPlayers.splice(playerIndex,1);
                break;
            }
        }
        teams?.get(over.id).push(movedPlayer);
    }

    const fetchPlayers = async () => {
        let res = await playerActions.findPlayer();
        if (res) {
            let teamMap = new Map();
            teamMap.set(NOT_ASSIGNED_TEAM_NAME,[]);
            teamNames.forEach(name => {
                teamMap.set(name,[]);
            });
            res.forEach(p => {
                if(p.team) {
                    teamMap.get(p.team).push(p);
                }else {
                    teamMap.get(NOT_ASSIGNED_TEAM_NAME).push(p);
                }
            });
            setTeams(teamMap);
        }
    }

    const generateTeams = () => {
        setTeams(teamActions.buildTeams(teams, teamNames));
        setFetch(fetch => fetch + 1);
    }

    useEffect(() => {
        fetchPlayers();
    }, [])

    return (<>
        <DndContext onDragEnd={handleDragEnd}>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <SectionHeader title="Gestione Squadre" />
                <Grid item xs={0} md={2} />
                <Grid item xs={12} md={8}>
                    <Button fullWidth onClick={() => {generateTeams();}}>Genera Squadre</Button>
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
    </>);
}

export default TeamPage;