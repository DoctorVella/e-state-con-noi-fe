import { NOT_ASSIGNED_TEAM_NAME } from "../util/Constants";

const useTeamActions = () => {

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

    const persistTeamChanges = (changes) => {
        console.log(changes);
    }

    return {
        buildTeams,
        persistTeamChanges
    };
}

export default useTeamActions;