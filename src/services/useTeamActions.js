import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { NOT_ASSIGNED_TEAM_NAME } from "../util/Constants";

const useTeamActions = () => {
    const { setLoading, axiosInstance } = useContext(GlobalContext);

    const buildTeams = (teamMap, teamNames) => {
        let players = teamMap.get(NOT_ASSIGNED_TEAM_NAME);
        players.sort((a,b) => (a.age - b.age));
        let nameIndex = 0;
        players.forEach(p => {
            teamMap.get(teamNames[nameIndex]).push(p);
            nameIndex ++;
            if(nameIndex === teamNames.length) {
                nameIndex = 0;
            }
        })
        teamMap.set(NOT_ASSIGNED_TEAM_NAME,[]);
        return teamMap;
    };

    const persistTeamChanges = async (changes) => {
        try{
            setLoading(true);
            await axiosInstance.put("/team-assign",changes);
            setLoading(false);
            return true;
        }catch(e) {
            setLoading(false);
            console.log(e);
            return false;
        }
    }

    return {
        buildTeams,
        persistTeamChanges
    };
}

export default useTeamActions;