import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import usePlayerActions from "../services/usePlayerActions";
import useTeamActions from "../services/useTeamActions";
import { DndContext } from '@dnd-kit/core';
import TeamDroppable from "../components/TeamDroppable";
import SectionHeader from "../components/SectionHeader";
import { AZZURRI_TEAM_NAME, GIALLI_TEAM_NAME, ROSSI_TEAM_NAME, VERDI_TEAM_NAME } from "../util/Constants";

const TeamPage = () => {
    const playerActions = usePlayerActions();
    const teamActions = useTeamActions();
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState();
    const teamNames = [AZZURRI_TEAM_NAME, GIALLI_TEAM_NAME, ROSSI_TEAM_NAME, VERDI_TEAM_NAME];

    const handleDragEnd = (event) => {
        const {over, active} = event;
        let movedPlayer;
        for(let nameIndex in teamNames) {
            let teamPlayers = teams?.get(teamNames[nameIndex]);
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
            setPlayers(res);
        }
    }

    const generateTeams = () => {
        setTeams(teamActions.buildTeams(players, teamNames));
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
                {teamNames.map((id) => (
                    <Grid item xs={12} md={2} key={id}>
                        <TeamDroppable  name={id} players={teams?.get(id)} />
                    </Grid>
                ))}
                <Grid item xs={0} md={2} />
            </Grid>
        </DndContext>
    </>);
}

export default TeamPage;