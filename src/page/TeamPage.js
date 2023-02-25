import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import usePlayerActions from "../services/usePlayerActions";
import useTeamActions from "../services/useTeamActions";

const TeamPage = () => {
    const playerActions = usePlayerActions();
    const teamActions = useTeamActions();
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState();

    const fetchPlayers = async () => {
        let res = await playerActions.findPlayer();
        if (res) {
            setPlayers(res);
        }
    }

    const generateTeams = () => {
        setTeams(teamActions.buildTeams(players, ["AZZURRI", "GIALLI", "ROSSI", "VERDI"])); 
    }

    useEffect(() => {
        fetchPlayers();
    }, [])

    return(<>
        <Grid container rowSpacing={2} columnSpacing={5}>
            <Grid item xs={0} md={2} />
            <Grid item xs={12} md={8}>
                {teams ?
                    <div>
                        {JSON.stringify(teams.get("AZZURRI"))}
                    </div>
                    : <Button fullWidth onClick={() => {generateTeams();}}>Genera Squadre</Button>
                }
            </Grid>
            <Grid item xs={0} md={2} />
        </Grid>
    </>);
}

export default TeamPage;